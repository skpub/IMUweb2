"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import imuLogo from "@/../public/IMU_logo.svg"
import imuLogoLight from "@/../public/IMU_logo_light.svg"
import imuText from "@/../public/IMU_text_logo.svg"
import imuTextLight from "@/../public/IMU_text_logo_light.svg"
import { Hamburger } from "@/components/hamburger"
import { useColorScheme } from "../stores/scheme"
import styles from "./header.module.css"

function Menu() {
  const pathName = usePathname()
  const contents = [
    { title: "学長挨拶", href: "/president" },
    { title: "アクセス", href: "/access" },
    { title: "学部・大学院", href: "/department" },
    { title: "入試情報", href: "/admission" },
  ]
  return (
    <div className={styles.menuContainer}>
      <div className={styles.MenuMobile}>
        {/* mobile */}
        <Hamburger width={200} links={contents}></Hamburger>
      </div>
      <div className={styles.MenuPC}>
        {/* PC */}
        {contents.map(({ title, href }) => (
          <Link
            className={href === pathName ? styles.currentLink : styles.link}
            key={href}
            href={href}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export function Header() {
  const scheme = useColorScheme()
  return (
    <div className={styles.main}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image
            className={styles.imuLogo}
            src={scheme === "dark" ? imuLogoLight : imuLogo}
            alt={"インモラル大学のロゴです"}
          />
          <Image
            className={styles.imuText}
            src={scheme === "dark" ? imuTextLight : imuText}
            alt={"インモラル大学のロゴです"}
          />
        </div>
      </Link>
      <Menu />
    </div>
  )
}
