"use client"

import { redirect } from "next/navigation"
import { useState } from "react"
import { OTC2IDToken } from "./actions"
import styles from "./page.module.css"

export default function VerifyPage() {
  const [_, setVerifyState] = useState<"idle" | "success" | "error">("idle")
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
    <div className={styles.container}>
      <h1>ワンタイムコード入力</h1>
      <form action={getToken}>
        <input
          id="code"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="012345"
          required
        />
        <button type="submit">送信</button>
      </form>
    </div>
  )
}
