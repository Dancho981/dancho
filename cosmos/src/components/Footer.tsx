import { useReveal } from '../hooks/useReveal'

// Closing reflection + data credits.
export function Footer() {
  const { ref, shown } = useReveal<HTMLElement>({ threshold: 0.4 })

  return (
    <footer ref={ref} className={`footer${shown ? ' is-shown' : ''}`}>
      <div className="footer-glow" />
      <blockquote className="footer-quote">
        „Das Universum ist nicht nur seltsamer, als wir annehmen — es ist
        seltsamer, als wir annehmen <em>können</em>."
      </blockquote>
      <p className="footer-cite">— frei nach J.B.S. Haldane</p>

      <p className="footer-note">
        Alle Größen sind reale, gerundete astronomische Schätzwerte. Über 27
        Größenordnungen lässt sich nichts perfekt maßstabsgetreu auf einem
        Bildschirm zeigen — deshalb erzählen hier die Zahlen die wahre
        Geschichte.
      </p>
      <p className="footer-made">Mit Neugier gebaut · COSMOS</p>
    </footer>
  )
}
