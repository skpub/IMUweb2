import type { Metadata } from "next"
import "./globals.css"
import { SmokeOverlay } from "@/components/smoke_overlay"
import Footer from "@/features/footer"
import { Header } from "@/features/header"
import { ColorSchemeProvider } from "../stores/scheme"

export const metadata: Metadata = {
  title: "インモラル大学公式サイト",
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
          {/* ColorSchemeProvider によって useColoeScheme できる ("light" | "dark")*/}
          <Header />
          <SmokeOverlay style={{ paddingBottom: "100px" }}>
            <div
              style={{
                flex: "1",
              }}
            >
              {children}
            </div>
          </SmokeOverlay>
          <Footer />
        </ColorSchemeProvider>
      </body>
    </html>
  )
}
