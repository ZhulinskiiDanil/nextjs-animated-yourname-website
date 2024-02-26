import clsx from 'clsx'
import styles from './index.module.scss'
import type { CSSProperties, HTMLAttributes } from 'react'

// Components
import Image from 'next/image';

// Hooks
import { useMouse, useWindowSize } from '@uidotdev/usehooks';
import { useAnimations } from './model/useAnimations';

export function BackgroundIllustration({
  className, ...props
}: HTMLAttributes<HTMLDivElement>) {
  const [mouse, ref] = useMouse<HTMLDivElement>();
  const windowSize = useWindowSize();
  const text = 'YOUR NAME'

  useAnimations(ref)

  const lettersList = text.split('').map(letter => (
    <span data-letter>
      { letter === ' ' ? <>&nbsp;</> : letter }
    </span>
  ))

  return <div
    ref={ref}
    className={clsx(styles.container, className)}
    style={{
      '--x': mouse.x / (windowSize.width || 1),
      '--y': mouse.y / (windowSize.height || 1)
    } as CSSProperties & {
      '--x': number, '--y': number,
    }}
    {...props}
  >
    <div className={styles.shadow}></div>
    <div data-texts className={styles.texts}>
      <div className={clsx(styles.text, styles.front)}>
        <div data-text>{ lettersList }</div>
      </div>
      <div className={clsx(styles.text, styles.back)}>
        <div data-text>{ lettersList }</div>
      </div>
    </div>
    <div
      data-back-image
      className={clsx(styles.image, styles.back)}
    >
      <Image
        src="/images/back1.png"
        alt="Picture"
        quality={100}
        priority
        fill
      />
    </div>
    <div
      data-front-image
      className={clsx(styles.image, styles.front)}
    >
      <Image
        src="/images/front1.png"
        alt="Picture"
        quality={100}
        priority
        fill
      />
    </div>
    <div className="text"></div>
  </div>
}