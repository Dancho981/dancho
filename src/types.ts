// Shared types for the Volt onboarding flow.

export type StepId =
  | 'welcome'
  | 'phone'
  | 'verify'
  | 'profile'
  | 'payment'
  | 'location'
  | 'ready'

// The five steps that show a progress indicator in the top bar.
export const PROGRESS_STEPS: StepId[] = [
  'phone',
  'verify',
  'profile',
  'payment',
  'location',
]

// Data we collect from the user as they move through the flow.
export interface SignupData {
  countryCode: string
  phone: string
  code: string[]
  fullName: string
  email: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  locationEnabled: boolean
}

export const initialSignupData: SignupData = {
  countryCode: '+1',
  phone: '',
  code: ['', '', '', '', '', ''],
  fullName: '',
  email: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  locationEnabled: false,
}
