import { useEffect, useState } from 'react'

// Tracks overall page scroll as a 0–1 fraction, smoothed via rAF so the
// progress UI updates without jank on every scroll event.
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
