"use client"

import Image from "next/image"
import imuLogo from "@/../public/IMU_logo.svg"
import imuLogoLight from "@/../public/IMU_logo_light.svg"
import imuText from "@/../public/IMU_text_logo.svg"
import imuTextLight from "@/../public/IMU_text_logo_light.svg"
import { Hamburger, Meat } from "@/components/hamburger"
import { useColorScheme } from "../stores/scheme"
import styles from "./header.module.css"

function Menu() {
  return (
    <div>
      <div className={styles.MenuPC}>
        {/* mobile */}
        <Hamburger width={100}>
          <Meat>
            <Meat.Title>title</Meat.Title>
            <Meat.Link link={"link"}></Meat.Link>
          </Meat>
          <Meat>
            <Meat.Title>title</Meat.Title>
            <Meat.Link link={"link"}></Meat.Link>
          </Meat>
          <Meat>
            <Meat.Title>title</Meat.Title>
            <Meat.Link link={"link"}></Meat.Link>
          </Meat>
          <Meat>
            <Meat.Title>title</Meat.Title>
            <Meat.Link link={"link"}></Meat.Link>
          </Meat>
        </Hamburger>
      </div>
      <div className={styles.MenuMobile}>{/* PC */}</div>
    </div>
  )
}

export function Header() {
  const scheme = useColorScheme()
  return (
    <div className={styles.main}>
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
      <div className="hamburger">
        <Menu />
      </div>
    </div>
  )
}
