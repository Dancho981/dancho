import type { ReactNode } from 'react'

// An iPhone-style frame that hosts each screen, giving the web app a
// native-feeling device shell.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">{children}</div>
    </div>
  )
}
