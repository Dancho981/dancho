import { useEffect, useRef, useState } from 'react'

// Animates a number from 0 to `target` once `active` becomes true, using an
// ease-out curve for a satisfying "settling" feel.
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0)
  const raf = useRef(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setValue(target * eased)
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, active, duration])

  return value
}
