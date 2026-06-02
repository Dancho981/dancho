import { useEffect, useState } from 'react'
import { StatusBar } from '../components/StatusBar'
import { TopBar } from '../components/TopBar'
import { Keypad } from '../components/Keypad'
import type { SignupData } from '../types'

function formatPhone(digits: string): string {
  const d = digits.padEnd(10, '•').slice(0, 10)
  return `+1 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

export function VerifyScreen({
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
  const [seconds, setSeconds] = useState(28)

  // Count down the resend timer.
  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const filled = data.code.filter(Boolean).length
  const activeIndex = Math.min(filled, 5)

  const handleKey = (key: string) => {
    const code = [...data.code]
    if (key === 'del') {
      const last = code.map(Boolean).lastIndexOf(true)
      if (last >= 0) code[last] = ''
    } else if (filled < 6) {
      code[filled] = key
    }
    update({ code })

    // Auto-advance once all six digits are entered.
    if (key !== 'del' && filled === 5) {
      setTimeout(onNext, 250)
    }
  }

  return (
    <div className="screen">
      <StatusBar />
      <TopBar current="verify" onBack={onBack} />

      <div className="screen-content">
        <h1 className="heading">Enter the code</h1>
        <p className="subheading">
          Sent to <strong>{formatPhone(data.phone)}</strong>
        </p>

        <div className="code-row">
          {data.code.map((digit, i) => (
            <div
              key={i}
              className={`code-box${i === activeIndex ? ' code-box--active' : ''}`}
            >
              {digit}
              {i === activeIndex && <span className="caret" />}
            </div>
          ))}
        </div>

        <p className="resend">
          {seconds > 0 ? (
            <>Resend code in <strong>0:{seconds.toString().padStart(2, '0')}</strong></>
          ) : (
            <button className="resend-btn" onClick={() => setSeconds(28)}>
              Resend code
            </button>
          )}
        </p>
      </div>

      <div className="screen-footer">
        <Keypad onKey={handleKey} />
      </div>
    </div>
  )
}
