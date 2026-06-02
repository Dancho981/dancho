import { useScrollProgress } from '../hooks/useScrollProgress'

// A thin progress bar fixed at the top, plus a live "scale" readout showing
// the current order of magnitude in metres as the user descends the journey.
// Magnitudes run roughly from 10^0 (human) to 10^27 (universe).
export function ScrollProgress() {
  const p = useScrollProgress()
  const magnitude = Math.round(p * 27)

  return (
    <>
      <div className="progress-rail" aria-hidden="true">
        <div className="progress-fill" style={{ transform: `scaleX(${p})` }} />
      </div>
      <div className="scale-readout" aria-hidden="true">
        <span className="scale-readout-label">Maßstab</span>
        <span className="scale-readout-value">
          10<sup>{magnitude}</sup> m
        </span>
      </div>
    </>
  )
}
