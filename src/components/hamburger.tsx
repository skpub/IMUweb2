import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import hamburgerIcon from "@/../public/hamburger.svg"
import hamburgerLightIcon from "@/../public/hamburger_light.svg"
import timesIcon from "@/../public/times.svg"
import timesLightIcon from "@/../public/times_light.svg"
import { useColorScheme } from "@/app/stores/scheme"
import styles from "./hamburger.module.css"

interface MeatProps {
  children: React.ReactNode
}

interface MeatComposition {
  Title: React.FC<MeatTitleProps>
  Link: React.FC<MeatLinkProps>
}

interface MeatTitleProps {
  children: React.ReactNode
}

interface MeatLinkProps {
  link: string
}

export const Meat: React.FC<MeatProps> & MeatComposition = ({ children }) => {
  return <div className={styles.meat}>{children}</div>
}

const MeatTitle: React.FC<MeatTitleProps> = ({ children }) => {
  return <p>{children}</p>
}

const MeatLink: React.FC<MeatLinkProps> = ({ link }) => {
  return <Link href={link} />
}

Meat.Title = MeatTitle
Meat.Link = MeatLink

type HamburgerProps = {
  children: React.ReactElement<typeof Meat>[] | React.ReactElement<typeof Meat>
  width: number
}

export const Hamburger: React.FC<HamburgerProps> = ({ width, children }) => {
  const meats = React.Children.toArray(children) as React.ReactElement<
    typeof Meat
  >[]
  const [visible, setVisible] = useState(false)

  const scheme = useColorScheme()

  return (
    <div>
      <button
        type="button"
        onClick={() => setVisible(!visible)}
        style={{
          border: "none",
          padding: "10px",
          margin: "10px",
        }}
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
          {meats.map((meat, i) => (
            <div key={`${meat.key}_${i}`}>{meat}</div>
          ))}
        </div>
      )}
    </div>
  )
}
