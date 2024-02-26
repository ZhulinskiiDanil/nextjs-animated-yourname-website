import clsx from 'clsx'
import styles from './index.module.scss'
import type { HTMLAttributes } from 'react'

// Components
import Link from 'next/link'

type SideMenuProps = {
  items: {
    name: string
    href?: string
  }[]
}

export function SideMenu({
  items, className, ...props
}: SideMenuProps & HTMLAttributes<HTMLUListElement>) {
  return <ul className={clsx(styles.list, className)} {...props}>
    {items.map(item => (
      <Link
        key={item.name}
        href={item.href || ''}
        className={clsx(styles.item, item.href && styles.link)}
        aria-disabled={!item.href}
      >
        { item.name }
      </Link>
    ))}
  </ul>
}