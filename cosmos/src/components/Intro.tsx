import { useReveal } from '../hooks/useReveal'

// A short bridge between the hero and the journey, setting expectations for
// the scale of what's coming.
export function Intro() {
  const { ref, shown } = useReveal<HTMLDivElement>({ threshold: 0.4 })

  return (
    <section className="intro" ref={ref}>
      <div className={`intro-inner${shown ? ' is-shown' : ''}`}>
        <p className="intro-line">
          Wir Menschen sind gut darin, kleine Zahlen zu begreifen.
        </p>
        <p className="intro-line intro-line--big">
          Aber das Universum spielt in Größenordnungen, die unsere Vorstellung
          sprengen.
        </p>
        <p className="intro-line">
          Diese Reise führt durch <strong>16 Stationen</strong> und{' '}
          <strong>27 Zehnerpotenzen</strong> — von 1,7 Metern bis zu fast
          10<sup>27</sup> Metern. Atme tief durch. Und scrolle weiter.
        </p>
      </div>
    </section>
  )
}
