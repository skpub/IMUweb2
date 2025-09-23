import { type NextRequest, NextResponse } from "next/server"
import { setNewToken, verifyJWT } from "./lib/jwt"

export async function middleware(req: NextRequest) {
  const tokenState = await verifyJWT()

  switch (tokenState.state) {
    case "error":
      return NextResponse.redirect(new URL("/verify", req.url))
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

export const config = {
  matcher: "/auth/:path*",
}
