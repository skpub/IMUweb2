import type { Metadata } from "next"
import "./globals.css"
import Footer from "@/features/footer"
import { Header } from "@/features/header"
import { ColorSchemeProvider } from "../stores/scheme"

export const metadata: Metadata = {
  title: "IMUwebapp",
  description: "インモラル大学の公式サイトです",
  icons: [{ rel: "icon", url: "/IMU_logo_light.svg" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ColorSchemeProvider>
          <Header />
        </ColorSchemeProvider>
        <div
          style={{
            flex: "1",
          }}
        >
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
