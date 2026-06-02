import { useId } from 'react'
import type { CosmicObject } from '../data/objects'

// Deterministic pseudo-random generator so scattered stars/galaxies stay put
// between renders.
function rng(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => (s = (s * 16807) % 2147483647) / 2147483647
}

interface Dot {
  x: number
  y: number
  r: number
  o: number
}
function scatter(seed: number, n: number, cx: number, cy: number, spread: number): Dot[] {
  const rand = rng(seed)
  return Array.from({ length: n }, () => {
    const a = rand() * Math.PI * 2
    const d = Math.pow(rand(), 0.6) * spread
    return {
      x: cx + Math.cos(a) * d,
      y: cy + Math.sin(a) * d,
      r: 0.4 + rand() * 1.4,
      o: 0.4 + rand() * 0.6,
    }
  })
}

// Renders an object-specific illustration inside a 0–100 viewBox, themed with
// the object's colour palette. Celestial bodies keep their glow; physical
// things (human, whale, mountain) get recognisable silhouettes.
export function ObjectArt({
  obj,
  size,
  spin = true,
}: {
  obj: CosmicObject
  size: number
  spin?: boolean
}) {
  const uid = useId().replace(/:/g, '')
  const [light, mid, dark] = obj.colors

  return (
    <div className="art-wrap" style={{ width: size, height: size }}>
      {obj.starburst && (
        <div
          className="sphere-burst"
          style={{
            width: size * 2.1,
            height: size * 2.1,
            background: `radial-gradient(circle, ${mid}66 0%, ${mid}22 35%, transparent 70%)`,
          }}
        />
      )}
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="art-svg"
        style={{ filter: `drop-shadow(0 0 ${size * 0.05}px ${mid}aa)` }}
        role="img"
        aria-label={obj.name}
      >
        {renderArt(obj.id, uid, [light, mid, dark], spin)}
      </svg>
    </div>
  )
}

// ------------------------------------------------------------------
// Per-object illustrations
// ------------------------------------------------------------------
function renderArt(
  id: string,
  uid: string,
  [light, mid, dark]: string[],
  spin: boolean,
) {
  const orbGrad = (
    <radialGradient id={`${uid}-orb`} cx="35%" cy="30%" r="75%">
      <stop offset="0%" stopColor={light} />
      <stop offset="55%" stopColor={mid} />
      <stop offset="100%" stopColor={dark} />
    </radialGradient>
  )

  switch (id) {
    /* ---------- Human ---------- */
    case 'human':
      return (
        <g fill={mid} stroke={light} strokeWidth="1">
          <circle cx="50" cy="24" r="9" fill={light} stroke="none" />
          <rect x="41" y="33" width="18" height="30" rx="9" />
          <rect x="43" y="58" width="6" height="28" rx="3" />
          <rect x="51" y="58" width="6" height="28" rx="3" />
          <rect x="32" y="35" width="6" height="26" rx="3" transform="rotate(14 35 48)" />
          <rect x="62" y="35" width="6" height="26" rx="3" transform="rotate(-14 65 48)" />
        </g>
      )

    /* ---------- Blue whale ---------- */
    case 'whale':
      return (
        <g>
          <defs>
            <linearGradient id={`${uid}-w`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={light} />
              <stop offset="100%" stopColor={dark} />
            </linearGradient>
          </defs>
          {/* spout */}
          <g stroke={light} strokeWidth="1.6" strokeLinecap="round" opacity="0.8">
            <path d="M26 30 C24 24 26 20 25 16" fill="none" />
            <path d="M30 31 C30 25 33 22 33 17" fill="none" />
            <path d="M22 32 C19 27 18 24 17 20" fill="none" />
          </g>
          {/* body */}
          <path
            d="M88 52 C78 40 58 38 40 41 C27 43 16 47 11 53 C16 60 27 62 40 63 C58 65 78 63 88 52 Z"
            fill={`url(#${uid}-w)`}
          />
          {/* belly grooves */}
          <g stroke={dark} strokeWidth="0.8" opacity="0.45">
            <path d="M20 54 H44" fill="none" />
            <path d="M20 57 H42" fill="none" />
            <path d="M22 60 H40" fill="none" />
          </g>
          {/* fluke (tail) */}
          <path d="M86 52 L99 44 L93 52 L99 61 Z" fill={mid} />
          {/* pectoral fin */}
          <path d="M44 60 L52 70 L55 60 Z" fill={dark} opacity="0.8" />
          {/* eye */}
          <circle cx="22" cy="51" r="1.8" fill="#06121f" />
        </g>
      )

    /* ---------- Mount Everest ---------- */
    case 'everest':
      return (
        <g>
          <defs>
            <linearGradient id={`${uid}-m`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={light} />
              <stop offset="100%" stopColor={dark} />
            </linearGradient>
          </defs>
          {/* back peak */}
          <path d="M30 84 L58 38 L80 84 Z" fill={dark} opacity="0.7" />
          {/* main peak */}
          <path d="M8 84 L42 26 L74 84 Z" fill={`url(#${uid}-m)`} />
          {/* snow cap */}
          <path d="M42 26 L33 44 L38 41 L42 48 L47 40 L51 45 Z" fill="#f8fbff" />
          {/* ridge shadow */}
          <path d="M42 26 L42 48 L74 84 L58 84 Z" fill={dark} opacity="0.25" />
        </g>
      )

    /* ---------- Earth ---------- */
    case 'earth':
      return (
        <g>
          <defs>
            <radialGradient id={`${uid}-ocean`} cx="38%" cy="32%" r="75%">
              <stop offset="0%" stopColor="#9fd5ff" />
              <stop offset="55%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#0a1f5c" />
            </radialGradient>
            <clipPath id={`${uid}-c`}>
              <circle cx="50" cy="50" r="38" />
            </clipPath>
          </defs>
          <circle cx="50" cy="50" r="41" fill="#7dd3fc" opacity="0.18" />
          <circle cx="50" cy="50" r="38" fill={`url(#${uid}-ocean)`} />
          <g clipPath={`url(#${uid}-c)`} fill="#3fa34d">
            <path d="M30 34 C40 30 50 34 48 44 C46 52 36 52 32 60 C28 52 22 44 30 34 Z" />
            <path d="M58 40 C68 38 74 46 70 54 C66 62 58 60 56 70 C50 64 50 50 58 40 Z" />
            <path d="M40 66 C46 64 52 68 50 74 C46 80 40 76 38 72 Z" fill="#2f8a3f" />
          </g>
          <circle cx="50" cy="50" r="38" fill="none" stroke="#bfe6ff" strokeWidth="0.6" opacity="0.5" />
        </g>
      )

    /* ---------- Jupiter ---------- */
    case 'jupiter':
      return (
        <g>
          <defs>
            <radialGradient id={`${uid}-j`} cx="36%" cy="30%" r="78%">
              <stop offset="0%" stopColor="#fde9c0" />
              <stop offset="60%" stopColor="#d99a4e" />
              <stop offset="100%" stopColor="#6e3a1a" />
            </radialGradient>
            <clipPath id={`${uid}-jc`}>
              <circle cx="50" cy="50" r="40" />
            </clipPath>
          </defs>
          <circle cx="50" cy="50" r="40" fill={`url(#${uid}-j)`} />
          <g clipPath={`url(#${uid}-jc)`}>
            <ellipse cx="50" cy="32" rx="46" ry="4" fill="#b9794a" opacity="0.6" />
            <ellipse cx="50" cy="42" rx="46" ry="3.5" fill="#f3d6a6" opacity="0.55" />
            <ellipse cx="50" cy="52" rx="46" ry="5" fill="#a86535" opacity="0.5" />
            <ellipse cx="50" cy="62" rx="46" ry="3.5" fill="#e9c089" opacity="0.55" />
            <ellipse cx="50" cy="70" rx="46" ry="4" fill="#90522a" opacity="0.5" />
            {/* great red spot */}
            <ellipse cx="62" cy="56" rx="8" ry="5" fill="#c0492f" opacity="0.85" />
          </g>
        </g>
      )

    /* ---------- Stars (sun + the giants) ---------- */
    case 'sun':
    case 'sirius':
    case 'betelgeuse':
    case 'uyscuti':
    case 'stephenson':
      return (
        <g>
          <defs>{orbGrad}</defs>
          {/* corona flares */}
          <g
            className={spin ? 'art-rotate' : undefined}
            fill={mid}
            opacity="0.5"
            style={{ transformOrigin: '50px 50px' }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2
              const x1 = 50 + Math.cos(a) * 34
              const y1 = 50 + Math.sin(a) * 34
              const x2 = 50 + Math.cos(a) * 46
              const y2 = 50 + Math.sin(a) * 46
              return (
                <path
                  key={i}
                  d={`M${x1} ${y1} L${x2} ${y2}`}
                  stroke={mid}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
              )
            })}
          </g>
          <circle cx="50" cy="50" r="32" fill={`url(#${uid}-orb)`} />
          {/* twinkle sparkle */}
          <g className="art-sparkle" fill="#ffffff" opacity="0.85" style={{ transformOrigin: '50px 50px' }}>
            <path d="M50 6 L53 50 L50 94 L47 50 Z" opacity="0.35" />
            <path d="M6 50 L50 53 L94 50 L50 47 Z" opacity="0.35" />
          </g>
        </g>
      )

    /* ---------- Solar system ---------- */
    case 'solarsystem':
      return (
        <g>
          <defs>{orbGrad}</defs>
          <g className={spin ? 'art-rotate' : undefined} style={{ transformOrigin: '50px 50px' }}>
            {[16, 26, 36, 45].map((r) => (
              <ellipse
                key={r}
                cx="50"
                cy="50"
                rx={r}
                ry={r * 0.42}
                fill="none"
                stroke={light}
                strokeWidth="0.7"
                opacity="0.45"
              />
            )).concat(
              [16, 26, 36, 45].map((r, i) => {
                const a = i * 1.7
                return (
                  <circle
                    key={`p${r}`}
                    cx={50 + Math.cos(a) * r}
                    cy={50 + Math.sin(a) * r * 0.42}
                    r={2 + (i % 2)}
                    fill={i % 2 ? '#cbd5ff' : light}
                  />
                )
              }),
            )}
          </g>
          {/* central sun */}
          <circle cx="50" cy="50" r="9" fill="#fde68a" />
          <circle cx="50" cy="50" r="13" fill="#fbbf24" opacity="0.35" />
        </g>
      )

    /* ---------- Light year ---------- */
    case 'lightyear':
      return (
        <g>
          <defs>
            <linearGradient id={`${uid}-beam`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={light} />
              <stop offset="100%" stopColor={mid} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* source star */}
          <circle cx="16" cy="50" r="7" fill={light} />
          <circle cx="16" cy="50" r="12" fill={mid} opacity="0.35" />
          {/* light beam */}
          <rect x="16" y="47" width="78" height="6" rx="3" fill={`url(#${uid}-beam)`} />
          {/* speed chevrons */}
          <g stroke={light} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8">
            <path d="M40 44 L46 50 L40 56" />
            <path d="M56 44 L62 50 L56 56" />
            <path d="M72 44 L78 50 L72 56" />
          </g>
        </g>
      )

    /* ---------- Milky Way (spiral galaxy) ---------- */
    case 'milkyway':
      return (
        <g className={spin ? 'art-rotate' : undefined} style={{ transformOrigin: '50px 50px' }}>
          <defs>
            <radialGradient id={`${uid}-g`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff7e6" />
              <stop offset="30%" stopColor={light} />
              <stop offset="100%" stopColor={dark} stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="50" cy="50" rx="46" ry="20" fill={`url(#${uid}-g)`} opacity="0.55" transform="rotate(-18 50 50)" />
          {/* spiral arms via scattered stars */}
          {scatter(7, 70, 50, 50, 44).map((d, i) => {
            const ang = -0.3 + Math.atan2(d.y - 50, d.x - 50)
            const rad = Math.hypot(d.x - 50, d.y - 50)
            const sx = 50 + Math.cos(ang + rad * 0.12) * rad
            const sy = 50 + Math.sin(ang + rad * 0.12) * rad * 0.45
            return <circle key={i} cx={sx} cy={50 + (sy - 50)} r={d.r * 0.8} fill="#e8ecff" opacity={d.o} />
          })}
          <ellipse cx="50" cy="50" rx="12" ry="8" fill="#fff3d6" transform="rotate(-18 50 50)" />
        </g>
      )

    /* ---------- Local Group (cluster of galaxies) ---------- */
    case 'localgroup': {
      const galaxies = [
        { x: 50, y: 50, r: 12, ry: 5, rot: -20 },
        { x: 26, y: 34, r: 8, ry: 3.5, rot: 30 },
        { x: 74, y: 64, r: 7, ry: 3, rot: -50 },
        { x: 30, y: 70, r: 5, ry: 2.5, rot: 10 },
        { x: 70, y: 28, r: 4, ry: 2, rot: 60 },
      ]
      return (
        <g>
          {scatter(11, 40, 50, 50, 46).map((d, i) => (
            <circle key={`s${i}`} cx={d.x} cy={d.y} r={d.r * 0.5} fill="#9fb0ff" opacity={d.o * 0.6} />
          ))}
          {galaxies.map((g, i) => (
            <g key={i} transform={`rotate(${g.rot} ${g.x} ${g.y})`}>
              <ellipse cx={g.x} cy={g.y} rx={g.r} ry={g.ry} fill={light} opacity="0.45" />
              <circle cx={g.x} cy={g.y} r={g.ry} fill="#fff3d6" />
            </g>
          ))}
        </g>
      )
    }

    /* ---------- Laniakea (cosmic web / filaments) ---------- */
    case 'laniakea': {
      const nodes = scatter(23, 16, 50, 50, 44)
      nodes.push({ x: 50, y: 50, r: 3.2, o: 1 }) // great attractor
      return (
        <g>
          <g stroke={light} strokeWidth="0.5" opacity="0.4">
            {nodes.map((n, i) =>
              nodes
                .slice(i + 1)
                .filter((m) => Math.hypot(m.x - n.x, m.y - n.y) < 26)
                .map((m, j) => (
                  <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} />
                )),
            )}
          </g>
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r * 1.4} fill={i === nodes.length - 1 ? '#fff3d6' : light} opacity={n.o} />
          ))}
        </g>
      )
    }

    /* ---------- Observable universe ---------- */
    case 'universe':
      return (
        <g>
          <defs>
            <radialGradient id={`${uid}-u`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={dark} stopOpacity="0" />
              <stop offset="78%" stopColor={mid} stopOpacity="0.15" />
              <stop offset="100%" stopColor={light} stopOpacity="0.9" />
            </radialGradient>
            <clipPath id={`${uid}-uc`}>
              <circle cx="50" cy="50" r="44" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${uid}-uc)`}>
            <g stroke={light} strokeWidth="0.4" opacity="0.3">
              {scatter(41, 14, 50, 50, 42).map((n, i, arr) =>
                arr
                  .slice(i + 1)
                  .filter((m) => Math.hypot(m.x - n.x, m.y - n.y) < 24)
                  .map((m, j) => <line key={`${i}-${j}`} x1={n.x} y1={n.y} x2={m.x} y2={m.y} />),
              )}
            </g>
            {scatter(41, 90, 50, 50, 43).map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill={i % 5 === 0 ? '#fbc8ff' : i % 3 === 0 ? '#bfe6ff' : '#ffffff'}
                opacity={d.o}
              />
            ))}
          </g>
          <circle cx="50" cy="50" r="44" fill={`url(#${uid}-u)`} />
          <circle cx="50" cy="50" r="44" fill="none" stroke={light} strokeWidth="1" opacity="0.7" />
        </g>
      )

    /* ---------- Fallback: a simple orb ---------- */
    default:
      return (
        <g>
          <defs>{orbGrad}</defs>
          <circle cx="50" cy="50" r="36" fill={`url(#${uid}-orb)`} />
        </g>
      )
  }
}
