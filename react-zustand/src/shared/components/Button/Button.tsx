import { type ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      // Disable the button while a loading operation is in progress to prevent
      // duplicate submissions, in addition to any explicit `disabled` prop.
      disabled={disabled || loading}
      className={[
        styles.btn,
        styles[`variant_${variant}`],
        styles[`size_${size}`],
        fullWidth ? styles.fullWidth : '',
        loading ? styles.loading : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Show a spinner inside the button instead of swapping out the label
          so the button width stays stable during the loading state. */}
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  )
}
