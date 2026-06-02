import { StatusBar } from '../components/StatusBar'
import { TopBar } from '../components/TopBar'
import { Button } from '../components/Button'
import type { SignupData } from '../types'

export function LocationScreen({
  update,
  onBack,
  onNext,
}: {
  data: SignupData
  update: (patch: Partial<SignupData>) => void
  onBack: () => void
  onNext: () => void
}) {
  const enable = () => {
    update({ locationEnabled: true })
    onNext()
  }

  return (
    <div className="screen">
      <StatusBar />
      <TopBar current="location" onBack={onBack} />

      <div className="screen-content">
        <div className="map-preview">
          <span className="map-label">map preview</span>
          <span className="pin pin-1" />
          <span className="pin pin-2" />
          <span className="pin pin-3" />
        </div>

        <h1 className="heading">Find bikes near you</h1>
        <p className="subheading">
          Volt uses your location to show nearby bikes and the closest docks for parking.
        </p>

        <div className="spacer" />

        <Button onClick={enable}>Enable location</Button>
        <button className="ghost-link" onClick={onNext}>
          Not now
        </button>
      </div>
    </div>
  )
}
