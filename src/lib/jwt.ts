"use server"

import * as jose from "jose"
import { cookies } from "next/headers"

const encoder = new TextEncoder()
const secret = encoder.encode(process.env.JWT_SECRET)

type TokenState =
  | { state: "new"; currentToken: jose.JWTPayload }
  | { state: "continue"; currentToken: jose.JWTPayload }
  | { state: "error" }

export async function verifyJWT(): Promise<TokenState> {
  const cookie = await cookies()
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
      return { state: "new", currentToken: payload.payload }
    }
    return { state: "continue", currentToken: payload.payload }
  } catch (_) {
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
