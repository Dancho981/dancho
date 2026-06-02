import type { ReactNode } from 'react'

type Variant = 'gradient' | 'white' | 'ghost'

// Primary call-to-action button used across the flow.
export function Button({
  children,
  onClick,
  variant = 'gradient',
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  disabled?: boolean
}) {
  return (
    <button
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
