import { useState } from 'react'
import { OBJECTS, byId } from '../data/objects'
import { fmtRatio } from '../format'
import { useReveal } from '../hooks/useReveal'
import { useCountUp } from '../hooks/useCountUp'
import { ObjectSphere } from './ObjectSphere'

const BIG = 180 // px for the larger object in the comparison stage

// Render a real-world analogy: shrink the bigger object to a basketball and
// see how tiny the smaller one becomes.
function analogy(ratio: number, smallName: string): string {
  const meters = 0.24 / ratio // basketball ≈ 24 cm
  let size: string
  if (meters >= 1) size = `${fmtRatio(meters)} m`
  else if (meters >= 0.01) size = `${(meters * 100).toFixed(1)} cm`
  else if (meters >= 1e-3) size = `${(meters * 1000).toFixed(1)} mm`
  else if (meters >= 1e-6) size = `${(meters * 1e6).toFixed(1)} µm (ein Staubkorn)`
  else if (meters >= 1e-9) size = `${(meters * 1e9).toFixed(1)} nm (kleiner als ein Virus)`
  else size = 'kleiner als ein einzelnes Atom'
  return `Wäre das größere Objekt ein Basketball (24 cm), wäre ${smallName} nur ${size} groß.`
}

export function ComparisonExplorer() {
  const { ref, shown } = useReveal<HTMLDivElement>({ threshold: 0.2 })
  const [aId, setAId] = useState('sun')
  const [bId, setBId] = useState('stephenson')

  const a = byId(aId)
  const b = byId(bId)
  const bigger = a.diameter >= b.diameter ? a : b
  const smaller = a.diameter >= b.diameter ? b : a
  const ratio = bigger.diameter / smaller.diameter

  // Re-trigger the count-up whenever the pair changes by keying the hook
  // through `shown` plus the ids.
  const counted = useCountUp(ratio, shown, 1200)

  const smallSize = Math.max(BIG / ratio, 3)
  const tiny = BIG / ratio < 3

  return (
    <section className="explorer" ref={ref}>
      <div className={`explorer-inner${shown ? ' is-shown' : ''}`}>
        <p className="section-kicker">Interaktiv</p>
        <h2 className="section-title">Vergleiche selbst</h2>
        <p className="section-lead">
          Wähle zwei beliebige Objekte und sieh ihren wahren Größenunterschied —
          maßstabsgetreu.
        </p>

        <div className="explorer-controls">
          <label className="picker">
            <span>Objekt A</span>
            <select value={aId} onChange={(e) => setAId(e.target.value)}>
              {OBJECTS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>
          <span className="vs">vs</span>
          <label className="picker">
            <span>Objekt B</span>
            <select value={bId} onChange={(e) => setBId(e.target.value)}>
              {OBJECTS.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="explorer-stage" key={`${aId}-${bId}`}>
          <div className="explorer-obj">
            <ObjectSphere obj={bigger} size={BIG} spin={false} />
            <span className="explorer-tag">{bigger.name}</span>
          </div>
          <div className="explorer-obj">
            <span
              className="explorer-small"
              style={{
                width: smallSize,
                height: smallSize,
                background: `radial-gradient(circle at 32% 28%, ${smaller.colors[0]}, ${smaller.colors[1]} 50%, ${smaller.colors[2]})`,
                boxShadow: `0 0 ${tiny ? 8 : smallSize * 0.4}px ${smaller.colors[1]}`,
              }}
            />
            <span className="explorer-tag">
              {smaller.name}
              {tiny && ' (winzig!)'}
            </span>
          </div>
        </div>

        <div className="explorer-result">
          {ratio <= 1.0001 ? (
            <p className="explorer-ratio">Gleich groß — wähle zwei verschiedene Objekte.</p>
          ) : (
            <>
              <p className="explorer-ratio">
                <strong>{bigger.name}</strong> ist{' '}
                <span className="explorer-big-num">{fmtRatio(counted)}×</span> so groß
                wie <strong>{smaller.name}</strong>
              </p>
              <p className="explorer-analogy">{analogy(ratio, smaller.name)}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
