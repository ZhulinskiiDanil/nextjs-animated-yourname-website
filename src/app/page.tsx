'use client';
import styles from "./page.module.scss"

// Hooks
import useSmoothScroll from "@/shared/libs/useSmoothScroll/useSmoothScroll"

// Components
import MainSection from "./components/Landing/MainSection"
import { CommingSoon } from "./components/Landing/CommingSoon";

export default function Landing() {
  const [
    wrapperRef, contentRef
  ] = useSmoothScroll<HTMLDivElement, HTMLDivElement>()

  return (
    <main ref={wrapperRef}>
      <div ref={contentRef} className={styles.content}>
        <MainSection />
        <CommingSoon />
      </div>
    </main>
  )
}
