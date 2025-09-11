import * as jose from "jose"

export async function verifyJWT(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const payload = await jose.jwtVerify(token, secret)
  return payload.payload
}
