import { StatusBar } from '../components/StatusBar'
import { TopBar } from '../components/TopBar'
import { Button } from '../components/Button'
import type { SignupData } from '../types'

// Group card digits into "4242 4242 4242 4242".
function formatCard(digits: string): string {
  return digits
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(digits: string): string {
  const d = digits.slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)} / ${d.slice(2)}`
}

export function PaymentScreen({
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
  const onlyDigits = (s: string) => s.replace(/\D/g, '')
  const valid = data.cardNumber.length === 16 && data.cardExpiry.length === 4 && data.cardCvc.length >= 3

  return (
    <div className="screen">
      <StatusBar />
      <TopBar current="payment" onBack={onBack} />

      <div className="screen-content">
        <h1 className="heading">Add a payment method</h1>
        <p className="subheading">You're only charged per ride. No subscription required.</p>

        <label className="field-label">Card number</label>
        <div className="card-field">
          <span className="card-brand">VISA</span>
          <input
            className="card-input"
            inputMode="numeric"
            value={formatCard(data.cardNumber)}
            onChange={(e) => update({ cardNumber: onlyDigits(e.target.value).slice(0, 16) })}
            placeholder="4242 4242 4242 4242"
          />
        </div>

        <div className="card-row">
          <div className="card-col">
            <label className="field-label">Expiry</label>
            <input
              className="text-field"
              inputMode="numeric"
              value={formatExpiry(data.cardExpiry)}
              onChange={(e) => update({ cardExpiry: onlyDigits(e.target.value).slice(0, 4) })}
              placeholder="09 / 28"
            />
          </div>
          <div className="card-col">
            <label className="field-label">CVC</label>
            <input
              className="text-field"
              inputMode="numeric"
              type="password"
              value={data.cardCvc}
              onChange={(e) => update({ cardCvc: onlyDigits(e.target.value).slice(0, 4) })}
              placeholder="•••"
            />
          </div>
        </div>

        <p className="secure-note">
          <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
            <rect x="1" y="5.5" width="9" height="7" rx="1.5" stroke="#8a8a9a" strokeWidth="1.3" />
            <path d="M3 5.5V4a2.5 2.5 0 0 1 5 0v1.5" stroke="#8a8a9a" strokeWidth="1.3" />
          </svg>
          Encrypted &amp; stored securely
        </p>

        <div className="spacer" />

        <Button onClick={onNext} disabled={!valid}>
          Add card
        </Button>
      </div>
    </div>
  )
}
