"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

const ColorSchemeContext = createContext<"light" | "dark">("dark")

export const ColorSchemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [scheme, setScheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    setScheme(media.matches ? "dark" : "light")

    const listener = (event: MediaQueryListEvent) => {
      setScheme(event.matches ? "dark" : "light")
    }

    media.addEventListener("change", listener)

    return () => {
      media.removeEventListener("change", listener)
    }
  }, [])

  return (
    <ColorSchemeContext value={scheme}>
      {children}
    </ColorSchemeContext>
  )
}

export const useColorScheme = () => useContext(ColorSchemeContext)
