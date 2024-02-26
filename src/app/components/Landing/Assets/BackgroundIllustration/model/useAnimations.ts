import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MutableRefObject } from 'react';
import { getDistance } from './getDistance';
import { TextPlugin, ScrollTrigger } from "gsap/all"

export function useAnimations(
  ref: MutableRefObject<HTMLElement | null>
) {
  useGSAP(() => {
    gsap.registerPlugin(TextPlugin)
    gsap.registerPlugin(ScrollTrigger)

    const q = gsap.utils.selector(ref.current)
    const letters = q('[data-letter]')
    const backImage = q('[data-back-image]')
    const texts = q('[data-texts]')

    letters.map(letter => {
      const x = gsap.utils.random(-1, 1) // vw
      const y = gsap.utils.random(-10, 10) // vh
      const scale = gsap.utils.random(.1, .2)
      const rotate = gsap.utils.random(-20, 20) // deg

      letter.style.setProperty('--x', x.toString())
      letter.style.setProperty('--y', y.toString())
      letter.style.setProperty('--scale', scale.toString())
      letter.style.setProperty('--rotate', rotate.toString())
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    tl.to(ref.current, {
      '--shadowOpacity': 1
    }, '<')

    tl.to(texts, {
      '--yPercent': '20%'
    }, '<')

    tl.to(backImage, {
      "--object-position-x": "-150%"
    }, '<')

    function mousemove(e: MouseEvent) {
      const fontSize = ( // Actual fontSize
        window.innerWidth * .05 + window.innerHeight * .01
      ) * 1.5 // calc((5vw + 1vh) * 1.5)

      if (Array.isArray(letters)) {
        letters.map(letter => {
          const rect = letter.getBoundingClientRect()
          const coords = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          }

          const gap = fontSize * 2
          const distance = getDistance(coords.x, coords.y, e.clientX, e.clientY)
          const rangePipe = gsap.utils.pipe(
            gsap.utils.mapRange(fontSize * 8, gap, 0, 1),
            gsap.utils.clamp(0, 1)
          )
          const range = rangePipe(distance)

          letter.style.setProperty('--distance', range.toString())
        })
      }
    }

    document.addEventListener('mousemove', mousemove)
    return () => {
      document.removeEventListener('mousemove', mousemove)
    }
  }, [ref])
}