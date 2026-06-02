import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number // depth 0..1 — drives size, brightness and parallax
  tw: number // twinkle phase
}

interface Shooting {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  len: number
}

// A full-screen animated starfield rendered on canvas. Stars drift slowly,
// twinkle, parallax against scroll + pointer, and the occasional shooting
// star streaks across. Fixed behind all content.
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let stars: Star[] = []
    let shooting: Shooting[] = []
    const pointer = { x: 0, y: 0 }
    let scrollY = window.scrollY
    let raf = 0

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.round((w * h) / 6000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        tw: Math.random() * Math.PI * 2,
      }))
    }

    const spawnShooting = () => {
      const edge = Math.random()
      shooting.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.5,
        vx: 6 + Math.random() * 6,
        vy: 2 + Math.random() * 3,
        life: 1,
        len: 80 + Math.random() * 120 * (edge + 0.3),
      })
    }

    let last = performance.now()
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3)
      last = now
      ctx.clearRect(0, 0, w, h)

      const px = (pointer.x - w / 2) * 0.01
      const py = (pointer.y - h / 2) * 0.01

      for (const s of stars) {
        s.tw += 0.02 * dt
        const depth = 0.3 + s.z * 0.7
        const offX = px * depth * 4
        const offY = (py * depth * 4) - (scrollY * 0.04 * depth)
        let y = (s.y + offY) % h
        if (y < 0) y += h
        const x = (s.x + offX + w) % w

        const r = s.z * 1.6 + 0.3
        const twinkle = 0.55 + Math.sin(s.tw) * 0.45
        const alpha = (0.35 + s.z * 0.65) * twinkle
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${210 + s.z * 45}, ${220 + s.z * 30}, 255, ${alpha})`
        ctx.fill()
      }

      // Shooting stars.
      for (let i = shooting.length - 1; i >= 0; i--) {
        const m = shooting[i]
        m.x += m.vx * dt
        m.y += m.vy * dt
        m.life -= 0.012 * dt
        if (m.life <= 0 || m.x > w + 200 || m.y > h + 200) {
          shooting.splice(i, 1)
          continue
        }
        const tailX = m.x - m.vx * (m.len / 8)
        const tailY = m.y - m.vy * (m.len / 8)
        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
        grad.addColorStop(0, `rgba(255,255,255,${m.life})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
      }

      if (!reduced && Math.random() < 0.004 * dt && shooting.length < 2) {
        spawnShooting()
      }

      raf = requestAnimationFrame(frame)
    }

    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    const onScroll = () => {
      scrollY = window.scrollY
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer)
    window.addEventListener('scroll', onScroll, { passive: true })

    if (reduced) {
      frame(performance.now())
      cancelAnimationFrame(raf)
    } else {
      raf = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}
