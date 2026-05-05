"use client"
import { useEffect, useRef } from "react"
import { useColorScheme } from "@/stores/scheme"

type Twttr = { widgets: { load: (el: HTMLElement) => void } }

export function XTimeline() {
  const scheme = useColorScheme()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.innerHTML = `<blockquote class="twitter-tweet" data-lang="ja" data-theme="${scheme}">
      <p lang="ja" dir="ltr">モス。<br>インモラル大学学長 兼 実践ハラスメント学部長の佐藤海音です。<br>公式 X アカウントを開設し、公式サイトをデプロイしました。</p>
      &#x2014; インモラル大学公式 (@IMU_gakucho)
      <a href="https://twitter.com/IMU_gakucho/status/2051576123910480333?ref_src=twsrc%5Etfw">2026年5月5日</a>
    </blockquote>`

    const w = window as Window & { twttr?: Twttr }
    if (w.twttr) {
      w.twttr.widgets.load(el)
    } else {
      const script = document.createElement("script")
      script.src = "https://platform.twitter.com/widgets.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [scheme])

  return <div ref={ref} />
}
