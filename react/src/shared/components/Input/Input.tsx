import { type InputHTMLAttributes, forwardRef } from 'react'
import styles from './Input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, Props>(({ error, className, ...rest }, ref) => (
  <div className={styles.wrapper}>
    <input
      ref={ref}
      {...rest}
      className={[styles.input, error ? styles.inputError : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
    />
    {error && (
      <p className={styles.error} role="alert">
        {error}
      </p>
    )}
  </div>
))

Input.displayName = 'Input'
export default Input
