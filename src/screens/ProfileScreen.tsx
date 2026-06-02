import { StatusBar } from '../components/StatusBar'
import { TopBar } from '../components/TopBar'
import { Button } from '../components/Button'
import type { SignupData } from '../types'

export function ProfileScreen({
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
  const valid = data.fullName.trim().length > 1

  return (
    <div className="screen">
      <StatusBar />
      <TopBar current="profile" onBack={onBack} />

      <div className="screen-content">
        <h1 className="heading">Create your profile</h1>

        <div className="avatar-wrap">
          <div className="avatar" />
          <button className="avatar-add" aria-label="Add photo">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <label className="field-label">Full name</label>
        <input
          className="text-field"
          value={data.fullName}
          onChange={(e) => update({ fullName: e.target.value })}
          placeholder="Alex Rivera"
          autoFocus
        />

        <label className="field-label">Email</label>
        <input
          className="text-field"
          type="email"
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="you@email.com"
        />

        <div className="spacer" />

        <Button onClick={onNext} disabled={!valid}>
          Continue
        </Button>
      </div>
    </div>
  )
}
