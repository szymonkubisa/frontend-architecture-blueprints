import { type InputHTMLAttributes, forwardRef } from 'react'
import styles from './Input.module.css'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

// forwardRef lets parent components (e.g. forms using react-hook-form) attach
// a ref directly to the underlying <input> element for imperative focus/scroll.
const Input = forwardRef<HTMLInputElement, Props>(({ error, className, ...rest }, ref) => (
  <div className={styles.wrapper}>
    <input
      ref={ref}
      {...rest}
      className={[styles.input, error ? styles.inputError : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
    />
    {/* role="alert" makes screen readers announce the error message immediately
        when it appears, without the user having to move focus to it. */}
    {error && (
      <p className={styles.error} role="alert">
        {error}
      </p>
    )}
  </div>
))

// displayName is needed because the component is wrapped in forwardRef, which
// strips the function name; DevTools would otherwise show it as "ForwardRef".
Input.displayName = 'Input'
export default Input
