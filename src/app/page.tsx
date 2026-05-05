import Image from "next/image"
import { SlideShow } from "@/components/slideshow"
import bukatsu from "../../public/bukatsu.webp"
import img0 from "../../public/img0.webp"
import img1 from "../../public/img1.webp"
import img2 from "../../public/img2.webp"
import img3 from "../../public/img3.webp"
import img4 from "../../public/img4.webp"
import img5 from "../../public/img5.webp"
import times from "../../public/times.webp"
import times_gakucho from "../../public/times_gakucho.webp"
import styles from "./page.module.css"
import stylesSlideshow from "./slideshow.module.css"

export default function Home() {
  const imgs = [img0, img1, img2, img3, img4, img5]
  return (
    <div className={styles.main}>
      <SlideShow styles={stylesSlideshow} imgs={imgs} interval={5000} />
      <div className={styles.content}>
        <p>インモラル大学へようこそ。</p>
        <p>
          インモラル大学は現在20人強の男女(20-30代くらい)からなるコミュニティです。Discordサーバとマイクラサーバを用いて雑談をしております(Discordだけの参加も多いです)。
        </p>
        <p>
          (インモラル大学という名称は私がテキトーに言っているだけのことで、別にヤリサーとか犯罪集団とかいうわけではありません。)
        </p>
        <p>
          本業がサーバサイドエンジニアである学長(佐藤海音)の経験を活かし、IT企業っぽく各自のTIMESを用意してみたり、
        </p>
        <div className={styles.col}>
          <Image src={times_gakucho} alt="学長のTimes" width={300}></Image>
          <Image src={times} alt="Times" width={300}></Image>
        </div>
        <p>部活動を用意して各自の趣味に応じた発言をしやすくしたり...</p>
        <div className={styles.col}>
          <Image src={bukatsu} alt="部活" width={200}></Image>
        </div>
        心理的安全性を確保しつつ発言しやすい環境作りを目指しています。
      </div>
    </div>
  )
}
