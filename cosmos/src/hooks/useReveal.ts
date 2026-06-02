import { useEffect, useRef, useState } from 'react'

// Reveals an element the first time it scrolls into view. Returns a ref to
// attach and a boolean that flips to true once visible — drives the
// fade/slide-in animations throughout the page.
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.25 },
) {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shown) return

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      }
    }, options)

    io.observe(el)
    return () => io.disconnect()
  }, [shown, options])

  return { ref, shown }
}
