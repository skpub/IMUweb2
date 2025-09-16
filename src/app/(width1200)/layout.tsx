import type React from "react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
        }}
      >
        {children}
      </div>
    </div>
  )
}
