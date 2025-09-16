import Link from "next/link"
import styles from "./page.module.css"
import { MarginLeftRight24 } from "@/components/marginLeft24"

export default function Home() {
  const departments = [
    {
      name: "🎵騒音学部",
      description: "うるさいです。",
      dean: "まぼのすけたろ",
      href: "6o_dwir",
    },
    {
      name: "🔞実践ハラスメント学部",
      description: "終わっています。",
      dean: "佐藤海音",
      href: "OMGR_dearinsu",
    },
    {
      name: "🎩自称マナー講師学部",
      description: "余計なマナーをクリエイトして社会に水を差します。",
      dean: "佐藤海音",
      href: "OMGR_dearinsu",
    },
  ]
  return (
    <MarginLeftRight24>
      <h1 className={styles.title}>学部・大学院</h1>
      {departments.map(({ name, description, dean, href }) => (
        <div className={styles.container} key={name}>
          <h1 className={styles.department}>{name}</h1>
          <div>
            <p>{description}</p>
            <p>
              学部長: {dean}
              <Link href={`https://x.com/${href}`}>@{href}</Link>
            </p>
          </div>
        </div>
      ))}
    </MarginLeftRight24>
  )
}
