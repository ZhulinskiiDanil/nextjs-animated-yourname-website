import clsx from 'clsx'
import styles from './index.module.scss'
import type { Episode } from '@/app/ts/episode'

// Hooks
import { HTMLAttributes, useState } from 'react'

// Components
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineLink, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

export function UIEpisode({
  className, data, ...props
}: HTMLAttributes<HTMLDivElement> & { data: Episode }) {
  const [saved, setSaved] = useState(() => data.saved)

  return <div
    className={clsx(styles.episode, className)}
    {...props}
  >
    {data.imageURL && (
      <Link href={data.href} className={styles.link}>
        <div className={styles.image}>
          <Image
            src={data.imageURL}
            alt={data.title}
            fill
          />
        </div>
      </Link>
    )}
    <div className={styles.data}>
      <Link href={data.href} className={styles.link}>
        <p className={styles.title}>
          <span data-accent>{ data.title }</span> #{ data.episode } Episode
        </p>
      </Link>
      <p className={styles.description}>
        { data.description }
      </p>
    </div>
    <div className={styles.tools}>
      {saved && <AiFillHeart
        onClick={() => setSaved(false)}
        className={styles.icon}
      />}
      {!saved && <AiOutlineHeart
        onClick={() => setSaved(true)}
        className={clsx(
          styles.icon,
          styles.heart,
          saved && styles.saved
        )}
      />}
      <AiOutlineLink className={styles.icon} />
    </div>
  </div>
}