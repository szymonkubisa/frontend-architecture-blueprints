import { type ReactNode } from 'react'
import styles from './AuthLayout.module.css'

interface Props {
  heading: string
  subheading?: string
  children: ReactNode
  footer?: ReactNode
}

export default function AuthLayout({ heading, subheading, children, footer }: Props) {
  return (
    <div className={styles.layout}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h1 className={styles.heading}>{heading}</h1>
          {subheading && <p className={styles.subheading}>{subheading}</p>}
        </div>
        <div className={styles.cardBody}>{children}</div>
        {footer && <div className={styles.cardFooter}>{footer}</div>}
      </div>
    </div>
  )
}
