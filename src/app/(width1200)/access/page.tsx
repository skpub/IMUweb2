import Image from "next/image"
import Link from "next/link"
import map from "@/../public/IMU_map.webp"
import { MarginLeftRight24 } from "@/components/marginLeft24"
import styles from "./page.module.css"

export default function Home() {
  return (
    <MarginLeftRight24>
      <h1 className={styles.title}>アクセス</h1>
      <MarginLeftRight24>
        <ol>
          <li>
            <Link href="/admission">インモラル大学の入試</Link>に合格する。
          </li>
          <li>
            学長にホワイトリストに追加され、マイクラサーバ利用の招待を受ける。
          </li>
        </ol>
      </MarginLeftRight24>
      <h1 className={styles.title}>キャンパスマップ</h1>
      <Image
        className={styles.map}
        src={map}
        alt="インモラル大学マップ"
      ></Image>
    </MarginLeftRight24>
  )
}
