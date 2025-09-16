import Image from "next/image"
import president from "@/../public/president.webp"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>学長挨拶</h1>
      <div className={styles.container}>
        <div className={styles.presidentContainer}>
          <Image className={styles.presidentImg} src={president} alt={"学長"} />
          <div className={styles.presidentProfile}>
            <h1>インモラル大学学長</h1>
            <h1>佐藤海音 (Sato Kaito)</h1>
            <p>博士(実践ハラスメント学)(インモラル大学) ※</p>
            <p className={styles.gray}>
              ※上記の私のプロフィースは名前と肖像以外全て虚偽です。
            </p>
          </div>
        </div>
        <div className={styles.uzaText}>
          <p>
            <span className={styles.emphasize}>
              新入生の皆さん、インモラル大学へようこそ(150dB)。
            </span>
          </p>
          <p>大学全入時代突入と言われて久しいですが、最近になって</p>
          <p>「大学は就職予備校に成り下がっているのではないか」</p>
          <p>
            「成果主義に陥って、基礎研究を蔑ろにして、短期的な利益ばかりを追い求めていないか」
          </p>
          <p>
            といった非難が各所から寄せられています。社会の情勢に応じた変化を大学教育に求めるのは正当なことですが、一方で教育機関であるばかりでなく研究機関でもある大学の役割を鑑みれば、こうした状況に手をこまねいてはいられません。
          </p>
          <p>
            「利益を齎すのとは逆に、寧ろ社会に莫大な不利益を齎す大学があってもよいのではないか。」
          </p>
          <p>
            この新構想を実現するため、議会前365日爆音デモを挙行し、政治家に不当な圧力を掛けて
            <span className={styles.emphasize}>みだりにみだらに</span>
            建学したのが、他でもない本学、インモラル大学なのです。
          </p>
        </div>
      </div>
    </div>
  )
}
