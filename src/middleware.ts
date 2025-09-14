import { type NextRequest, NextResponse } from "next/server"
import { setNewToken, verifyJWT } from "./lib/jwt"

export async function middleware(req: NextRequest) {
  const tokenState = await verifyJWT(req)

  switch (tokenState.state) {
    case "error":
      return
    case "continue":
      return
    case "new": {
      const newToken = await setNewToken(tokenState.currentToken)
      const response = NextResponse.next()
      response.cookies.set("token", newToken)
      return response
    }
  }
}
