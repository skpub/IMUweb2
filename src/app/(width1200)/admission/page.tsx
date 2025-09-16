import Link from "next/link"
import styles from "./page.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>入試情報</h1>
      <div className={styles.margin24}>
        <p>
          本学は国賊浅学凡人という特殊な形態を取っております。通常の国立大学法人その他とは異なり、共通テストを用いない独自形式で随時入試を受け付けています。
        </p>
      </div>
      <h1 className={styles.title}>いざない</h1>
      <div className={styles.margin24}>
        <p>インモラル大学は、老若男女・思想の垣根を越えた多様性を尊重します。例えば女性の入学も2名ほど受け入れています。女性だから、若いからと断ることはありません。飛び入学・飛び卒業・飛び級を認めない多くの日本の大学よりはよほど開かれた大学です。ただしポリス的動物としての振る舞いは期待されるでしょう。</p>
      </div>
      <h1 className={styles.title}>アドミッションポリシー</h1>
      <div className={styles.margin24}>
        <ul>
          <li>好きなものに好きと言えること</li>
          <li>素直であること</li>
          <li>主体性と責任感を持つこと</li>
        </ul>
      </div>
      <h1 className={styles.title}>受験方法</h1>
      <div className={styles.margin24}>
        <ol className={styles.list}>
          <li>
            <Link href="shiken.pdf">試験問題(pdf)</Link>
            を解いて、
            <Link href="https://x.com/OMGR_dearinsu">
              解答をXのDMで学長に送ります。
            </Link>
          </li>
          <li>
            筆記試験が合格だった場合、学長がDiscord面談に誘い、相性を見ます。
          </li>
          <li>
            面談の結果が良好だった場合、ホワイトリストに追加され、マイクラサーバに案内されます。
          </li>
        </ol>
      </div>
    </div>
  )
}
