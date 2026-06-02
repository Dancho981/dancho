import { StatusBar } from '../components/StatusBar'

export function WelcomeScreen({
  onStart,
  onLogin,
}: {
  onStart: () => void
  onLogin: () => void
}) {
  return (
    <div className="screen screen--welcome">
      <StatusBar light />

      <div className="welcome-body">
        <div className="welcome-logo">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="#fff" />
          </svg>
        </div>

        <h1 className="welcome-title">Volt</h1>
        <h2 className="welcome-tagline">
          Unlock the city.
          <br />
          Ride on demand.
        </h2>
        <p className="welcome-sub">
          Thousands of e-bikes across town, one tap away.
        </p>
      </div>

      <div className="welcome-actions">
        <button className="btn btn--white" onClick={onStart}>
          Get started
        </button>
        <button className="welcome-login" onClick={onLogin}>
          I already have an account
        </button>
      </div>

      {/* Decorative corner glow echoing the design's lighter facet. */}
      <div className="welcome-facet" />
    </div>
  )
}
