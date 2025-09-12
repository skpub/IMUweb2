"use client"

import { redirect } from "next/navigation"
import { useState } from "react"
import { OTC2IDToken } from "./actions"

export default function VerifyPage() {
  const [verifyState, setVerifyState] = useState<"idle" | "success" | "error">(
    "idle",
  )
  const getToken = async (formData: FormData) => {
    const res = await OTC2IDToken(formData)
    if (res) {
      redirect("/auth")
    } else {
      setVerifyState("error")
    }
  }
  const [code, setCode] = useState("")

  return (
    <form action={getToken}>
      <input
        id="code"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <button type="submit">送信</button>
      {verifyState}
    </form>
  )
}
