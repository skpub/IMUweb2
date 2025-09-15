"use client"

import Image, { type StaticImageData } from "next/image"
import { useEffect, useState } from "react"

export type SlideShowProps = {
  styles: { readonly [key: string]: string }
  imgs: StaticImageData[]
  interval: number
}

export function SlideShow({ styles, imgs, interval }: SlideShowProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % imgs.length)
    }, interval)

    return () => clearInterval(timer)
  }, [imgs.length, interval])

  return (
    <div className={styles.box} style={{ width: "100%", position: "relative"}}>
      {imgs.map((img, i) => (
        <Image
          className={styles.img}
          key={img.src}
          src={img}
          alt={`スライド ${i + 1}`}
          style={{
            position: "absolute",
            opacity: i === index ? "1" : "0",
            transition: "opacity 1s ease-in-out",
            objectFit: "cover",
            width: "100%",
            display: "block",
            height: "auto",
          }}
        />
      ))}
    </div>
  )
}
