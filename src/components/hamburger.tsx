import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import hamburgerIcon from "@/../public/hamburger.svg"
import hamburgerLightIcon from "@/../public/hamburger_light.svg"
import timesIcon from "@/../public/times.svg"
import timesLightIcon from "@/../public/times_light.svg"
import { useColorScheme } from "@/stores/scheme"
import styles from "./hamburger.module.css"

type HamburgerLink = {
  href: string
  title: string
}

type HamburgerProps = {
  links: HamburgerLink[]
  width: number
}

export const Hamburger: React.FC<HamburgerProps> = ({ width, links }) => {
  const [visible, setVisible] = useState(false)

  const scheme = useColorScheme()

  return (
    <div>
      <button
        className={styles.button}
        type="button"
        onClick={() => setVisible(!visible)}
      >
        <Image
          src={
            scheme === "dark"
              ? visible
                ? timesLightIcon
                : hamburgerLightIcon
              : visible
                ? timesIcon
                : hamburgerIcon
          }
          alt={"ハンバーガー"}
          width={30}
          height={30}
        />
      </button>
      {visible && (
        <div
          className={styles.meats}
          style={{
            width: width,
          }}
        >
          {links.map((link) => (
            <div className={styles.meat} key={link.title}>
              <Link
                className={styles.link}
                onClick={() => setVisible(false)}
                href={link.href}
              >
                {link.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
