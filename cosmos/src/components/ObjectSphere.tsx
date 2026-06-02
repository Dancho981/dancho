import type { CosmicObject } from '../data/objects'

// A glowing sphere representing a cosmic object, sized by `size` (px).
// Uses the object's colour stops for a lit-from-one-side look, with an
// optional ring (planets/galaxies) and starburst glow (stars).
export function ObjectSphere({
  obj,
  size,
  spin = true,
}: {
  obj: CosmicObject
  size: number
  spin?: boolean
}) {
  const [light, mid, dark] = obj.colors

  return (
    <div
      className="sphere-wrap"
      style={{ width: size, height: size }}
    >
      {obj.starburst && (
        <div
          className="sphere-burst"
          style={{
            background: `radial-gradient(circle, ${mid}66 0%, ${mid}22 35%, transparent 70%)`,
            width: size * 2.1,
            height: size * 2.1,
          }}
        />
      )}

      <div
        className={`sphere${spin ? ' sphere--spin' : ''}`}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle at 32% 28%, ${light} 0%, ${mid} 45%, ${dark} 100%)`,
          boxShadow: `0 0 ${size * 0.5}px ${mid}88, inset -${size * 0.18}px -${size * 0.18}px ${size * 0.3}px rgba(0,0,0,0.55)`,
        }}
      >
        {/* subtle surface banding for gas-giant / stellar texture */}
        <div className="sphere-bands" />
      </div>

      {obj.ring && (
        <div
          className="sphere-ring"
          style={{
            width: size * 1.9,
            height: size * 0.55,
            borderColor: `${light}cc`,
          }}
        />
      )}
    </div>
  )
}
