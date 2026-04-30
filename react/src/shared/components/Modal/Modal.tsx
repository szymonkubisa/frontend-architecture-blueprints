import { type ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

interface Props {
  open: boolean
  title?: string
  onClose: () => void
  closeOnOverlay?: boolean
  children: ReactNode
  footer?: ReactNode
}

export default function Modal({
  open,
  title,
  onClose,
  closeOnOverlay = true,
  children,
  footer,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Register a document-level keydown listener while the modal is open so
  // pressing Escape closes it — a standard accessibility expectation for
  // dialogs (ARIA APG). The listener is cleaned up when the modal closes.
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  // Return nothing instead of the portal so React can fully unmount the dialog
  // DOM when it's closed, freeing memory and resetting internal form state.
  if (!open) return null

  return createPortal(
    // Clicking the semi-transparent overlay closes the modal when closeOnOverlay
    // is enabled. The click handler is on the overlay div, not the panel.
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={closeOnOverlay ? onClose : undefined}
    >
      {/* stopPropagation prevents clicks inside the panel from bubbling up to
          the overlay and inadvertently closing the modal. */}
      <div
        ref={panelRef}
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button className={styles.closeBtn} aria-label="Close dialog" onClick={onClose}>
            ✕
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </div>,
    // Render into document.body so the modal sits above all other stacking
    // contexts, regardless of where in the component tree it is used.
    document.body,
  )
}
