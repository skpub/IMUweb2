"use client"

import { redirect } from "next/navigation";
import { useState } from "react"

export default function VerifyPage() {
    const [code, setCode] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        })

        if (res.ok) {
            redirect("/auth")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={code} onChange={e => setCode(e.target.value)} required />
            <button type="submit">送信</button>
        </form>
    )
}
