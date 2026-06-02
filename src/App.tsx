import { useState } from 'react'
import { PhoneFrame } from './components/PhoneFrame'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { PhoneScreen } from './screens/PhoneScreen'
import { VerifyScreen } from './screens/VerifyScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { PaymentScreen } from './screens/PaymentScreen'
import { LocationScreen } from './screens/LocationScreen'
import { ReadyScreen } from './screens/ReadyScreen'
import { initialSignupData, type SignupData, type StepId } from './types'

const ORDER: StepId[] = [
  'welcome',
  'phone',
  'verify',
  'profile',
  'payment',
  'location',
  'ready',
]

export default function App() {
  const [step, setStep] = useState<StepId>('welcome')
  const [data, setData] = useState<SignupData>(initialSignupData)
  // Direction drives the slide animation: 1 = forward, -1 = back.
  const [direction, setDirection] = useState(1)

  const update = (patch: Partial<SignupData>) =>
    setData((prev) => ({ ...prev, ...patch }))

  const go = (next: StepId) => {
    setDirection(ORDER.indexOf(next) >= ORDER.indexOf(step) ? 1 : -1)
    setStep(next)
  }

  const next = () => {
    const i = ORDER.indexOf(step)
    if (i < ORDER.length - 1) go(ORDER[i + 1])
  }

  const back = () => {
    const i = ORDER.indexOf(step)
    if (i > 0) go(ORDER[i - 1])
  }

  const restart = () => {
    setData(initialSignupData)
    go('welcome')
  }

  const screens: Record<StepId, React.ReactNode> = {
    welcome: <WelcomeScreen onStart={next} onLogin={next} />,
    phone: <PhoneScreen data={data} update={update} onBack={back} onNext={next} />,
    verify: <VerifyScreen data={data} update={update} onBack={back} onNext={next} />,
    profile: <ProfileScreen data={data} update={update} onBack={back} onNext={next} />,
    payment: <PaymentScreen data={data} update={update} onBack={back} onNext={next} />,
    location: <LocationScreen data={data} update={update} onBack={back} onNext={next} />,
    ready: <ReadyScreen data={data} onRestart={restart} />,
  }

  return (
    <div className="stage">
      <PhoneFrame>
        <div
          key={step}
          className={direction === 1 ? 'screen-anim slide-fwd' : 'screen-anim slide-back'}
        >
          {screens[step]}
        </div>
      </PhoneFrame>
      <p className="stage-hint">Volt — Signup flow · {ORDER.indexOf(step) + 1}/{ORDER.length}</p>
    </div>
  )
}
