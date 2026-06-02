import { StatusBar } from '../components/StatusBar'
import { TopBar } from '../components/TopBar'
import { Button } from '../components/Button'
import { Keypad } from '../components/Keypad'
import type { SignupData } from '../types'

// Format a raw digit string as "(415) 220-3812".
function formatPhone(digits: string): string {
  const d = digits.slice(0, 10)
  if (d.length === 0) return ''
  if (d.length <= 3) return `(${d}`
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export function PhoneScreen({
  data,
  update,
  onBack,
  onNext,
}: {
  data: SignupData
  update: (patch: Partial<SignupData>) => void
  onBack: () => void
  onNext: () => void
}) {
  const handleKey = (key: string) => {
    if (key === 'del') {
      update({ phone: data.phone.slice(0, -1) })
    } else if (data.phone.length < 10) {
      update({ phone: data.phone + key })
    }
  }

  const valid = data.phone.length === 10

  return (
    <div className="screen">
      <StatusBar />
      <TopBar current="phone" onBack={onBack} />

      <div className="screen-content">
        <h1 className="heading">What's your number?</h1>
        <p className="subheading">We'll text you a code to verify it's really you.</p>

        <div className="phone-row">
          <button className="country-select">
            <span className="flag">🇺🇸</span> US +1
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#8a8a9a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="phone-input">
            {formatPhone(data.phone) || <span className="placeholder">(415) 220-38</span>}
            <span className="caret" />
          </div>
        </div>
      </div>

      <div className="screen-footer">
        <Button onClick={onNext} disabled={!valid}>
          Continue
        </Button>
        <Keypad onKey={handleKey} />
      </div>
    </div>
  )
}
