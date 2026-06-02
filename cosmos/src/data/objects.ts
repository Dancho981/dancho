// The cosmic objects that make up the journey, ordered from smallest to
// largest. `diameter` is in metres — every comparison in the app is derived
// from this single source of truth.

export interface CosmicObject {
  id: string
  name: string
  category: string
  /** Diameter in metres. */
  diameter: number
  /** A short, human-readable form of the diameter (what the count-up lands on). */
  sizeLabel: string
  /** CSS color stops used to render the object's glowing sphere. */
  colors: [string, string, string]
  /** One or two sentences of context. */
  blurb: string
  /** A surprising, relatable fact. */
  fact: string
  /** Visual treatment hints. */
  ring?: boolean
  starburst?: boolean
}

const R_SUN = 6.957e8 // Sun radius in metres, for star diameters.

export const OBJECTS: CosmicObject[] = [
  {
    id: 'human',
    name: 'Ein Mensch',
    category: 'Wo wir starten',
    diameter: 1.7,
    sizeLabel: '1,7 Meter',
    colors: ['#fbcfe8', '#f472b6', '#831843'],
    blurb:
      'Unser Maßstab. Alles, was folgt, messen wir an dieser vertrauten Größe.',
    fact: 'Dein Körper besteht aus rund 37 Billionen Zellen — und aus Atomen, die in Sternen geschmiedet wurden.',
  },
  {
    id: 'whale',
    name: 'Blauwal',
    category: 'Das größte Tier',
    diameter: 30,
    sizeLabel: '30 Meter',
    colors: ['#a5f3fc', '#22d3ee', '#0e7490'],
    blurb:
      'Das größte Lebewesen, das je auf der Erde existierte — größer als jeder Dinosaurier.',
    fact: 'Sein Herz ist so groß wie ein Kleinwagen und schlägt nur 8–10 Mal pro Minute.',
  },
  {
    id: 'everest',
    name: 'Mount Everest',
    category: 'Der höchste Berg',
    diameter: 8849,
    sizeLabel: '8.849 Meter',
    colors: ['#e0e7ff', '#94a3b8', '#334155'],
    blurb: 'Vom Meeresspiegel bis zum Gipfel — das höchste Land der Erde.',
    fact: 'Sein Gestein war einmal ein Meeresboden. Auf dem Gipfel findet man fossile Muscheln.',
  },
  {
    id: 'earth',
    name: 'Die Erde',
    category: 'Unser Planet',
    diameter: 1.2742e7,
    sizeLabel: '12.742 Kilometer',
    colors: ['#7dd3fc', '#2563eb', '#0c1e5b'],
    blurb:
      'Der einzige bekannte Ort im Universum mit Leben. Ein blasser blauer Punkt.',
    fact: 'Du müsstest den Everest rund 1.440 Mal stapeln, um den Erddurchmesser zu erreichen.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    category: 'Der größte Planet',
    diameter: 1.3982e8,
    sizeLabel: '139.820 Kilometer',
    colors: ['#fde68a', '#d97706', '#7c2d12'],
    blurb:
      'Ein Gasriese, schwerer als alle anderen Planeten zusammen. In ihn passen über 1.300 Erden.',
    fact: 'Sein Großer Roter Fleck ist ein Sturm, größer als die ganze Erde — und tobt seit Jahrhunderten.',
  },
  {
    id: 'sun',
    name: 'Die Sonne',
    category: 'Unser Stern',
    diameter: 1.3927e9,
    sizeLabel: '1,39 Millionen Kilometer',
    colors: ['#fef9c3', '#fbbf24', '#dc2626'],
    starburst: true,
    blurb:
      'Ein durchschnittlicher Stern, der 99,86 % der Masse des gesamten Sonnensystems enthält.',
    fact: 'In ihr hätten etwa 1,3 Millionen Erden Platz. Ihr Licht braucht 8 Minuten bis zu uns.',
  },
  {
    id: 'sirius',
    name: 'Sirius A',
    category: 'Hellster Stern am Himmel',
    diameter: 1.71 * 2 * R_SUN,
    sizeLabel: '1,71 × Sonne',
    colors: ['#dbeafe', '#93c5fd', '#1d4ed8'],
    starburst: true,
    blurb:
      'Der hellste Stern unseres Nachthimmels — fast doppelt so groß wie die Sonne.',
    fact: 'Sirius ist nur 8,6 Lichtjahre entfernt und besitzt einen winzigen, ultradichten Begleiter: einen Weißen Zwerg.',
  },
  {
    id: 'betelgeuse',
    name: 'Beteigeuze',
    category: 'Roter Überriese',
    diameter: 764 * 2 * R_SUN,
    sizeLabel: '≈ 764 × Sonne',
    colors: ['#fed7aa', '#f97316', '#7f1d1d'],
    starburst: true,
    blurb:
      'Stünde sie im Zentrum des Sonnensystems, reichte ihre Oberfläche bis über die Marsbahn hinaus.',
    fact: 'Beteigeuze steht kurz davor (astronomisch gesehen) als Supernova zu explodieren — sichtbar selbst am Taghimmel.',
  },
  {
    id: 'uyscuti',
    name: 'UY Scuti',
    category: 'Einst der Rekordhalter',
    diameter: 1708 * 2 * R_SUN,
    sizeLabel: '≈ 1.708 × Sonne',
    colors: ['#fecaca', '#ef4444', '#450a0a'],
    starburst: true,
    blurb:
      'Lange galt UY Scuti als größter bekannter Stern. Ein Flugzeug bräuchte Jahrhunderte, um ihn zu umrunden.',
    fact: 'Trotz seiner gewaltigen Größe ist seine Materie dünner als die Erdatmosphäre — fast ein glühendes Vakuum.',
  },
  {
    id: 'stephenson',
    name: 'Stephenson 2-18',
    category: 'Der größte bekannte Stern',
    diameter: 2150 * 2 * R_SUN,
    sizeLabel: '≈ 2.150 × Sonne',
    colors: ['#fca5a5', '#dc2626', '#1c0606'],
    starburst: true,
    blurb:
      'Der größte Stern, den wir kennen. Setzte man ihn an die Stelle der Sonne, verschlänge er die Bahnen bis hin zum Saturn.',
    fact: 'Licht braucht über 8 Stunden, um ihn einmal zu umrunden. Die Sonne schafft das in unter 15 Sekunden.',
  },
  {
    id: 'solarsystem',
    name: 'Das Sonnensystem',
    category: 'Unsere Nachbarschaft',
    diameter: 8.976e12,
    sizeLabel: '≈ 60 AE (bis Neptun)',
    colors: ['#fde68a', '#a78bfa', '#1e1b4b'],
    ring: true,
    blurb:
      'Acht Planeten umkreisen die Sonne. Bis zur Neptunbahn ist das System rund 9 Milliarden km breit.',
    fact: 'Die Raumsonde Voyager 1 fliegt seit 1977 — und hat das Sonnensystem gerade erst verlassen.',
  },
  {
    id: 'lightyear',
    name: 'Ein Lichtjahr',
    category: 'Kosmische Entfernung',
    diameter: 9.461e15,
    sizeLabel: '9,46 Billionen Kilometer',
    colors: ['#c7d2fe', '#6366f1', '#1e1b4b'],
    blurb:
      'Die Strecke, die Licht in einem Jahr zurücklegt. Der nächste Stern liegt 4,24 Lichtjahre entfernt.',
    fact: 'Würdest du mit einem Auto bei 100 km/h fahren, wärst du über 10 Millionen Jahre für ein einziges Lichtjahr unterwegs.',
  },
  {
    id: 'milkyway',
    name: 'Die Milchstraße',
    category: 'Unsere Galaxie',
    diameter: 9.5e20,
    sizeLabel: '≈ 100.000 Lichtjahre',
    colors: ['#ddd6fe', '#8b5cf6', '#1e1b4b'],
    ring: true,
    blurb:
      'Eine Spiralgalaxie aus 100–400 Milliarden Sternen. Unsere Sonne ist nur einer davon, weit draußen in einem Spiralarm.',
    fact: 'Die Sonne braucht etwa 230 Millionen Jahre für eine Umrundung des galaktischen Zentrums — eine „kosmische Jahreszeit".',
  },
  {
    id: 'localgroup',
    name: 'Die Lokale Gruppe',
    category: 'Galaxienhaufen',
    diameter: 1e22,
    sizeLabel: '≈ 10 Millionen Lichtjahre',
    colors: ['#a5b4fc', '#6d28d9', '#0f0a2e'],
    blurb:
      'Über 80 Galaxien — angeführt von der Milchstraße und Andromeda — gebunden durch ihre gemeinsame Schwerkraft.',
    fact: 'Andromeda rast auf uns zu: In etwa 4,5 Milliarden Jahren verschmelzen beide Galaxien zu einer.',
  },
  {
    id: 'laniakea',
    name: 'Laniakea-Superhaufen',
    category: 'Unsere kosmische Heimat',
    diameter: 4.9e24,
    sizeLabel: '≈ 520 Millionen Lichtjahre',
    colors: ['#bae6fd', '#7c3aed', '#0a0720'],
    blurb:
      'Ein gewaltiges Netz aus über 100.000 Galaxien, zu dem auch die Milchstraße gehört. Der Name bedeutet „unermesslicher Himmel".',
    fact: 'Alle Galaxien in Laniakea strömen zu einem rätselhaften Schwerkraftzentrum: dem „Großen Attraktor".',
  },
  {
    id: 'universe',
    name: 'Das beobachtbare Universum',
    category: 'Die Grenze des Sichtbaren',
    diameter: 8.8e26,
    sizeLabel: '≈ 93 Milliarden Lichtjahre',
    colors: ['#f0abfc', '#7c3aed', '#020617'],
    starburst: true,
    blurb:
      'Alles, was wir je sehen können — gefüllt mit schätzungsweise zwei Billionen Galaxien. Und vielleicht nur ein winziger Teil von etwas noch Größerem.',
    fact: 'Das Universum ist 13,8 Mrd. Jahre alt, doch durch seine Ausdehnung ist sein sichtbarer Rand 46 Mrd. Lichtjahre entfernt.',
  },
]

// Convenience accessors for comparisons used across the app.
export const byId = (id: string) => OBJECTS.find((o) => o.id === id)!
export const SUN = byId('sun')
export const EARTH = byId('earth')
