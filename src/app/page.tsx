"use client"
import { SlideShow } from "@/components/slideshow"
import img0 from "../../public/img0.webp"
import img1 from "../../public/img1.webp"
import img2 from "../../public/img2.webp"
import img3 from "../../public/img3.webp"
import img4 from "../../public/img4.webp"
import img5 from "../../public/img5.webp"
import styles from "./page.module.css"
import stylesSlideshow from "./slideshow.module.css"

export default function Home() {
  const imgs = [img0, img1, img2, img3, img4, img5]
  return (
    <div className={styles.main}>
      <SlideShow styles={stylesSlideshow} imgs={imgs} interval={3000} />
    </div>
  )
}
