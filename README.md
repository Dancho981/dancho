# Volt — Bikesharing App

A pixel-faithful implementation of the **Volt** e-bike sharing onboarding flow,
built from the original design as a mobile-styled web app (React + Vite + TypeScript).

> _Unlock the city. Ride on demand._

## The flow (7 screens)

1. **Welcome** — branded gradient intro with "Get started" / "I already have an account"
2. **Phone number** — country selector + formatted phone input with iOS numeric keypad
3. **Verify code** — 6-digit code entry with a live resend countdown
4. **Profile** — avatar, full name & email
5. **Payment** — card number / expiry / CVC with live formatting
6. **Location** — map preview + "Enable location" permission prompt
7. **Ready** — first-ride confirmation screen

Each screen carries its own state, the progress indicator advances through the
five middle steps, and forward/back navigation is animated like a native push
transition. All data is kept in-memory (no backend) — this is the UI layer.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

Open the URL in a browser. On a desktop you'll see the app inside an iPhone-style
frame; on a narrow viewport it fills the screen like a real mobile app.

## Project structure

```
src/
  App.tsx            flow controller (step order, navigation, shared state)
  types.ts           StepId + SignupData model
  components/        PhoneFrame, StatusBar, TopBar, Button, Keypad
  screens/           one file per onboarding screen
  index.css          design tokens + all styling
```

## Tech

- **React 18** + **TypeScript**
- **Vite** for dev server and bundling
- Plain CSS with design tokens — no UI framework, so the look matches the
  original design exactly.
