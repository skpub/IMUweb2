import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyJWT } from "@/lib/jwt"

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = await cookies().then((c) => c.get("token")?.value)
  try {
    if (!token) throw new Error("No token")
    const payload = await verifyJWT(token)
    if (!payload) throw new Error("Invalid token")
  } catch (e) {
    redirect("/verify")
  }

  return <div>{children}</div>
}
