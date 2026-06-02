import { useReveal } from '../hooks/useReveal'
import { useCountUp } from '../hooks/useCountUp'
import { fmtRatio } from '../format'
import { ObjectArt } from './ObjectArt'
import { SUN, OBJECTS, type CosmicObject } from '../data/objects'

const STAR_IDS = new Set(['sun', 'sirius', 'betelgeuse', 'uyscuti', 'stephenson'])
const BIG_SPHERE = 230 // px — visual anchor size for the "hero" object

// One full chapter of the journey: a cosmic object with its size counting up,
// context, a fun fact, and — crucially — a true-to-scale dot showing how the
// previous object (or the Sun) shrinks against it.
export function ScaleSection({
  obj,
  index,
  prev,
}: {
  obj: CosmicObject
  index: number
  prev: CosmicObject | null
}) {
  const { ref, shown } = useReveal<HTMLElement>({ threshold: 0.3 })

  // For stars we anchor the comparison to the Sun (the brief's request);
  // otherwise we compare to the previous object to tell the growth story.
  const isStar = STAR_IDS.has(obj.id) && obj.id !== 'sun'
  const reference = isStar ? SUN : prev
  const ratio = reference ? obj.diameter / reference.diameter : 0

  const counted = useCountUp(ratio, shown && !!reference, 1600)

  // True-to-scale size of the reference object beside this one.
  const refSize = reference ? BIG_SPHERE / ratio : 0
  const refTooSmall = reference !== null && refSize < 2.5

  return (
    <section
      ref={ref}
      className={`chapter${shown ? ' is-shown' : ''}`}
      style={{ ['--accent' as string]: obj.colors[0] }}
    >
      <div className="chapter-visual">
        <div className="stage">
          <ObjectArt obj={obj} size={BIG_SPHERE} />

          {reference && (
            <div className="ref-dot-wrap">
              <span
                className="ref-dot"
                style={{
                  width: refTooSmall ? 3 : refSize,
                  height: refTooSmall ? 3 : refSize,
                  background: reference.colors[1],
                  boxShadow: `0 0 8px ${reference.colors[1]}`,
                }}
              />
              <span className="ref-dot-label">
                {reference.name}
                {refTooSmall && ' · < 1 px bei diesem Maßstab'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="chapter-text">
        <span className="chapter-index">
          {String(index + 1).padStart(2, '0')} / {String(OBJECTS.length).padStart(2, '0')}
        </span>
        <p className="chapter-kicker">{obj.category}</p>
        <h2 className="chapter-name">{obj.name}</h2>
        <p className="chapter-size">{obj.sizeLabel}</p>

        {reference && (
          <div className="chapter-ratio">
            <span className="ratio-num">{fmtRatio(counted)}×</span>
            <span className="ratio-label">
              {isStar ? 'so groß wie die Sonne' : `so groß wie ${reference.name}`}
            </span>
          </div>
        )}

        <p className="chapter-blurb">{obj.blurb}</p>

        <div className="chapter-fact">
          <span className="fact-icon" aria-hidden="true">✦</span>
          <p>{obj.fact}</p>
        </div>
      </div>
    </section>
  )
}
