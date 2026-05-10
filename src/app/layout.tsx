import type { Metadata } from "next"
import { headers } from "next/headers"
import "./globals.css"
import { SmokeOverlay } from "@/components/smoke_overlay"
import Footer from "@/features/footer"
import { Header } from "@/features/header"
import { ColorSchemeProvider } from "../stores/scheme"

const getMetadataBase = async () => {
  const configuredOrigin = process.env.IMUWEB_ORIGIN
  if (configuredOrigin && !configuredOrigin.includes("localhost")) {
    return new URL(configuredOrigin)
  }

  const headerStore = await headers()
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host")
  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https")

  return new URL(host ? `${protocol}://${host}` : "http://localhost")
}

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    metadataBase: await getMetadataBase(),
    title: {
      default: "インモラル大学",
      template: "%s | インモラル大学",
    },
    description: "インモラル大学の公式サイトです",
    icons: [{ rel: "icon", url: "/IMU_logo_light.svg" }],
    openGraph: {
      siteName: "インモラル大学",
      description: "インモラル大学の公式サイトです",
      images: [{ url: "/img0.webp" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  }
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
