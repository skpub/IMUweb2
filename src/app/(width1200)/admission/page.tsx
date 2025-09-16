import Link from "next/link"
import { MarginLeftRight24 } from "@/components/marginLeft24"
import styles from "./page.module.css"

export default function Home() {
  return (
    <MarginLeftRight24>
      <h1 className={styles.title}>入試情報</h1>
      <MarginLeftRight24>
        <p>
          本学は国賊浅学凡人という特殊な形態を取っております。通常の国立大学法人その他とは異なり、共通テストを用いない独自形式で随時入試希望を受け付けています。
        </p>
      </MarginLeftRight24>
      <h1 className={styles.title}>本学の趣旨</h1>
      <MarginLeftRight24>
        <p>
          本学のマイクラサーバとDiscordサーバの運営が趣旨です。両方の利用・どちらか片方だけの利用、どちらの目的でご連絡いただいても構いません。
        </p>
      </MarginLeftRight24>
      <h1 className={styles.title}>いざない</h1>
      <MarginLeftRight24>
        <p>
          {`インモラル大学は、老若男女・思想・障害の垣根を越えた多様性を尊重します。` +
            `例えば女性の入学も2名ほど受け入れています。精神障害を持っている人も2名ほど受け入れています(私と騒音学部長がそうです)。` +
            `女性だから、若いから、障害者だからと断ることはありません。` +
            `飛び入学・飛び卒業・飛び級を認めない多くの日本の大学よりはよほど開かれた大学です。`}
        </p>
        <p>
          {`ただしポリス的動物としての振る舞いは期待されるでしょう。` +
            `不必要な攻撃をしない。人の趣味をバカにしない。その上で人間として話していて楽しい。` +
            `そういう当たり前のことが当たり前に出来る学生ばかり集まってくれています。` +
            `新入生には社会人として当然のことを期待します。` +
            `年齢や職業や学歴や学生・労働者・経営者等立場の如何によらず上の社会人レベル1のようなことが出来る人間を本学は社会人と認め、歓迎します。`}
        </p>
      </MarginLeftRight24>
      <h1 className={styles.title}>アドミッションポリシー</h1>
      <MarginLeftRight24>
        <ul>
          <li>好きなものに好きと言えること</li>
          <li>素直であること</li>
          <li>主体性と責任感を持つこと</li>
        </ul>
      </MarginLeftRight24>
      <h1 className={styles.title}>受験方法</h1>
      <MarginLeftRight24>
        <ol className={styles.list}>
          <li>
            <Link href="shiken.pdf">試験問題(pdf)</Link>
            を解いて、
            <Link href="https://x.com/OMGR_dearinsu">
              解答をXのDMで学長に送って下さい。
            </Link>
          </li>
          <li>
            筆記試験が合格だった場合、学長がDiscord面談に誘い、人柄を見ます(自分の趣味や好きなものについて話を用意してきて下さい。15分程度を予定しますが、時間はその場の雰囲気で決めます)。
          </li>
          <li>
            {`面談の結果が良好だった場合、ホワイトリストに追加され、マイクラサーバに案内されます` +
              `(良好でなければDiscordサーバから追い出しますが、そもそもこの文章をここまで読むくらいに` +
              `コミュニケーションコストを割くことの大事さが分かる人間であればまず大丈夫だと思います(あなたは最も難しい0次試験合格です))。`}
          </li>
        </ol>
      </MarginLeftRight24>
    </MarginLeftRight24>
  )
}
