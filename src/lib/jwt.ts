"use server"

import * as jose from "jose"
import type { NextRequest } from "next/server"

const encoder = new TextEncoder()
const secret = encoder.encode(process.env.JWT_SECRET)

type TokenState =
  | { state: "new"; currentToken: jose.JWTPayload }
  | { state: "continue" }
  | { state: "error" }

export async function verifyJWT(req: NextRequest): Promise<TokenState> {
  const cookie = req.cookies
  const token = cookie.get("token")?.value
  if (!token) return { state: "error" }

  try {
    const payload = await jose.jwtVerify(token, secret, {
      issuer: "IMUwebapp",
      audience: "IMUwebapp",
    })

    // renew token if it spent more than 1 hour.
    const issuedAtMs = payload.payload.iat ? payload.payload.iat : 0
    if (Date.now() / 1000 - issuedAtMs > 3600) {
      console.log("issued at: ", issuedAtMs)
      console.log("now      : ", Date.now())
      return { state: "new", currentToken: payload.payload }
    }
    return { state: "continue" }
  } catch (err) {
    console.error("JWT verification error:", err)
    return { state: "error" }
  }
}

export async function setNewToken(
  currentTokenPayload: jose.JWTPayload,
): Promise<string> {
  const token = await new jose.SignJWT({
    sub: currentTokenPayload.sub,
    userName: currentTokenPayload.mc_name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(Math.floor(Date.now() / 1000))
    .setExpirationTime("3d")
    .setIssuer("IMUwebapp")
    .setAudience("IMUwebapp")
    .sign(secret)

  return token
}
