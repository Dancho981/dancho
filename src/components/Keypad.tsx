// iOS-style numeric keypad used on the phone-number and verify screens.
// Emits the pressed digit, or 'del' for the backspace key.
export function Keypad({ onKey }: { onKey: (key: string) => void }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del']

  return (
    <div className="keypad">
      {keys.map((k, i) =>
        k === '' ? (
          <span key={i} className="keypad-key keypad-key--empty" />
        ) : (
          <button
            key={i}
            className="keypad-key"
            onClick={() => onKey(k)}
            aria-label={k === 'del' ? 'Delete' : k}
          >
            {k === 'del' ? (
              <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                <path
                  d="M8.5 2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-14L1 10l7.5-8Z"
                  stroke="#1a1a2e"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="m12 7 7 6M19 7l-7 6"
                  stroke="#1a1a2e"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              k
            )}
          </button>
        ),
      )}
    </div>
  )
}
