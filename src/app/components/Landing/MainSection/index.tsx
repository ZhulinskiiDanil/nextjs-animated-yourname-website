'use client';
import clsx from "clsx"
import styles from "./index.module.scss"

// Hooks
import { CSSProperties, useEffect, useState } from "react"
import { useMouse, useWindowSize } from "@uidotdev/usehooks";

// Components
import { SideMenu } from "@/app/components/Landing/Assets/SideMenu";
import { BackgroundIllustration } from "../Assets/BackgroundIllustration";

export default function MainSection() {
  const [date, setDate] = useState<null | Date>(null)
  const [mouse] = useMouse();
  const windowSize = useWindowSize();

  const day = date && date.toLocaleDateString('ru', { day: 'numeric' })
  const month = date && date.toLocaleDateString('ru', { month: 'long' })
  const year = date && date.toLocaleDateString('ru', { year: 'numeric' })

  useEffect(() => {
    setDate(new Date())
  }, [])

  return (
    <section
      className={styles.main}
      style={{
        '--x': mouse.x / (windowSize.width || 1),
        '--y': mouse.y / (windowSize.height || 1)
      } as CSSProperties & {
        '--x': number, '--y': number,
      }}
    >
      <BackgroundIllustration />
      <SideMenu
        className={clsx(styles.sidemenu, styles.left)}
        items={[
          { name: 'Telegram', href: 'https://t.me/ZhulinskyDanil' },
          { name: 'GitHub', href: 'https://github.com/ZhulinskiiDanil' }
        ]}
      />
      {!!(day && year && month) && (
        <SideMenu
          className={clsx(styles.sidemenu, styles.right)}
          items={[
            { name: day },
            { name: year },
            { name: month }
          ]}
        />
      )}
    </section>
  );
}
