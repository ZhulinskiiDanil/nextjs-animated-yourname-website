import styles from './index.module.scss'

// Gsap
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'

export function CommingSoon() {
  const ref = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)

    const q = gsap.utils.selector(ref.current)
    const title = q('[data-title]')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom-=200',
        end: 'center bottom-=200',
        toggleActions: 'enter restart pause reverse pause'
      }
    })

    tl.set(title, {
      top: 100,
      opacity: 0
    })

    tl.to(title, {
      top: 0,
      opacity: 1,
      duration: 3
    }, '<')
  }, [ref])

  return <div ref={ref} className={styles.container}>
    <div data-title className={styles.title}>
      Comming Soon
    </div>
  </div>
}