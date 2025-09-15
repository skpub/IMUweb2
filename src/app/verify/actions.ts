"use server"

import fs from "node:fs"
import { credentials } from "@grpc/grpc-js"
import * as jose from "jose"
import { cookies } from "next/headers"
import { IdTokenProviderClient } from "../../../generate/IDTokenProvider_grpc_pb"
import { type MaybeId, UserCode } from "../../../generate/IDTokenProvider_pb"

// マイクラサーバにワンタイムコードを渡すとIDトークンが発行される(gRPC)。
// このServer Actionsは、
// One time code -(gRPCでマイクラサーバからIDトークンを得る)-> IDトークンをCookieに保存
// の処理を行う

const client = new IdTokenProviderClient(
  "localhost:50051",
  credentials.createInsecure(),
)

const pubkeyStr = fs.readFileSync(process.env.ID_TOKEN_PUBKEY_PATH as string, "utf-8")
const publickey = jose.importSPKI(pubkeyStr, "ES512")
const encoder = new TextEncoder()
const secret = encoder.encode(process.env.JWT_SECRET)

// gRPC呼び出し
async function getIdToken(userCode: string): Promise<string | null> {
  const code = userCode.trim()
  const req = new UserCode()
  req.setCode(code)

  const res = await new Promise<MaybeId>((resolve, reject) => {
    client.getToken(req, (err, res) => (err ? reject(err) : resolve(res)))
  })

  if (!res.getId()) return null
  return new TextDecoder().decode(res.getId() as Uint8Array)
}

export async function OTC2IDToken(formData: FormData): Promise<boolean> {
  const code = (formData.get("code") as string).trim()

  let idTokenStr: string | null
  try {
    idTokenStr = await getIdToken(code)
    if (!idTokenStr) return false
  } catch (err) {
    console.error("gRPC call error:", err)
    return false
  }

  let idToken: jose.JWTPayload
  try {
    const verified = await jose.jwtVerify(idTokenStr, await publickey, {
      issuer: "IMUserver",
      audience: "IMUwebapp",
    })
    idToken = verified.payload
  } catch (err) {
    console.error("ID token verification error:", err)
    return false
  }

  // generate access token and set cookie.
  const token = await new jose.SignJWT({
    sub: idToken.sub,
    userName: idToken.mc_name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("3d")
    .setIssuer("IMUwebapp")
    .setAudience("IMUwebapp")
    .sign(secret)

  const cookie = await cookies()
  cookie.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  })

  return true
}
