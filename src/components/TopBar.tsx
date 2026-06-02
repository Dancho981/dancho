import { PROGRESS_STEPS, type StepId } from '../types'

// Back chevron plus the 5-segment progress indicator shown on every
// step of the flow. `current` highlights how far along the user is.
export function TopBar({
  current,
  onBack,
}: {
  current: StepId
  onBack: () => void
}) {
  const activeIndex = PROGRESS_STEPS.indexOf(current)

  return (
    <div className="top-bar">
      <button className="back-btn" onClick={onBack} aria-label="Go back">
        <svg width="11" height="18" viewBox="0 0 11 18" fill="none">
          <path
            d="M9.5 1.5 2 9l7.5 7.5"
            stroke="#1a1a2e"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className="progress">
        {PROGRESS_STEPS.map((_, i) => (
          <span
            key={i}
            className={`progress-dot${i <= activeIndex ? ' progress-dot--active' : ''}${
              i === activeIndex ? ' progress-dot--current' : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}
