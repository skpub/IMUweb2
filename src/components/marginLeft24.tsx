import type React from "react"

export function MarginLeftRight24({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        marginLeft: "24px",
        marginRight: "24px",
      }}
    >
      {children}
    </div>
  )
}
