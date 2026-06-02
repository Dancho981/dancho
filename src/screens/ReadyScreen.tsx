import { StatusBar } from '../components/StatusBar'
import type { SignupData } from '../types'

// Final screen of the flow — the user is set up and ready for their first ride.
export function ReadyScreen({
  data,
  onRestart,
}: {
  data: SignupData
  onRestart: () => void
}) {
  const firstName = data.fullName.trim().split(' ')[0] || 'rider'

  return (
    <div className="screen screen--ready">
      <StatusBar light />

      <div className="ready-body">
        <div className="ready-check">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path
              d="M10 21l7 7 14-16"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="ready-title">You're all set, {firstName}!</h1>
        <p className="ready-sub">
          Your account is ready. Scan any Volt e-bike to unlock it and start your first ride.
        </p>

        <div className="ready-stats">
          <div className="ready-stat">
            <span className="ready-stat-num">1,200+</span>
            <span className="ready-stat-label">bikes nearby</span>
          </div>
          <div className="ready-stat-divider" />
          <div className="ready-stat">
            <span className="ready-stat-num">$1</span>
            <span className="ready-stat-label">to unlock</span>
          </div>
        </div>
      </div>

      <div className="ready-actions">
        <button className="btn btn--white" onClick={onRestart}>
          Find a bike
        </button>
        <button className="welcome-login" onClick={onRestart}>
          Start over
        </button>
      </div>

      <div className="welcome-facet" />
    </div>
  )
}
