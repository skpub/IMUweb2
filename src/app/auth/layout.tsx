import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { setNewToken, verifyJWT } from "@/lib/jwt"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookie = await cookies()
  const token = cookie.get("token")?.value
  const tokenStr = token?.split(".")
  /*
  switch (tokenState.state) {
    case "error":
      return redirect("/verify")
    case "continue":
      return
    case "new": {
      setNewToken(tokenState.currentToken).then((newToken) => {
        try {
          // fetch(process.env.IMUWEB_ORIGIN?.concat("/api/cookie")!, {
          fetch("/api/cookie", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: newToken }),
          })
        } catch (err) {
          console.log(err)
        }
      })
    }
  }
  */
  return (
    <div>
      {children}
      <p>{tokenStr![0]}</p>
      <p>{tokenStr![1]}</p>
      <p>{tokenStr![2]}</p>
      <p>{token}</p>
    </div>
  )
}
