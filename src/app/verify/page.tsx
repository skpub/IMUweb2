"use client"

import { useState } from "react"

export default function VerifyPage() {
    const [code, setCode] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        })

        if (res.ok) {
            setStatus("success");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={code} onChange={e => setCode(e.target.value)} required />
            <button type="submit">送信</button>
            {status === "success" && <p>認証成功</p>}
        </form>
    )
}
