// Opening screen: a slow nebula glow, the title revealing letter by letter,
// and a scroll cue inviting the journey to begin.
export function Hero() {
  const title = 'COSMOS'

  return (
    <header className="hero">
      <div className="hero-nebula" />
      <div className="hero-inner">
        <p className="hero-kicker">Eine Reise durch die Größen des Universums</p>

        <h1 className="hero-title" aria-label={title}>
          {title.split('').map((c, i) => (
            <span
              key={i}
              className="hero-letter"
              style={{ animationDelay: `${0.15 * i + 0.2}s` }}
            >
              {c}
            </span>
          ))}
        </h1>

        <p className="hero-sub">
          Vom Menschen bis zum Rand des Sichtbaren. Scrolle — und spüre, wie
          unvorstellbar groß alles wirklich ist.
        </p>

        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-text">Beginne die Reise</span>
          <span className="hero-mouse">
            <span className="hero-wheel" />
          </span>
        </div>
      </div>
    </header>
  )
}
