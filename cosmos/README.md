# COSMOS — Eine Reise durch die Größen des Universums

Eine scroll-getriebene, interaktive Website über die schier unvorstellbaren
Größenordnungen des Universums — vom Menschen (1,7 m) bis zum beobachtbaren
Universum (≈ 10²⁷ m). Gebaut mit **React + Vite + TypeScript**, ganz ohne
schwere Animationsbibliotheken: alle Effekte sind handgemacht für volle
Kontrolle und Smoothness.

## Was die Seite kann

- **Animierter Sternenhimmel** auf Canvas — mit Tiefen-Parallax (reagiert auf
  Maus & Scroll), funkelnden Sternen und gelegentlichen Sternschnuppen.
- **Scroll-Reise durch 16 Stationen**: Mensch → Blauwal → Everest → Erde →
  Jupiter → Sonne → Sirius → Beteigeuze → UY Scuti → Stephenson 2-18 →
  Sonnensystem → Lichtjahr → Milchstraße → Lokale Gruppe → Laniakea →
  beobachtbares Universum.
- **Echte Größenvergleiche**: Jede Station zählt das Größenverhältnis hoch
  (z. B. „Stephenson 2-18 ist ≈ 2.150× so groß wie die Sonne") und zeigt das
  jeweils vorige Objekt als **maßstabsgetreuen Punkt** daneben — oft kleiner
  als ein Pixel.
- **Interaktiver Vergleichs-Explorer**: zwei beliebige Objekte auswählen,
  maßstabsgetreu nebeneinander sehen, inklusive alltagstauglicher Analogie
  („Wäre das größere Objekt ein Basketball, wäre das kleinere …").
- **Live-Maßstabsanzeige** oben rechts (10ⁿ m) und eine Fortschrittsleiste.
- Sanfte Reveal-Animationen beim Scrollen, respektiert
  `prefers-reduced-motion`, voll responsiv.

## Starten

```bash
cd cosmos
npm install
npm run dev      # http://localhost:5173
npm run build    # Typprüfung + Produktions-Build
npm run preview  # Produktions-Build ansehen
```

## Aufbau

```
cosmos/
  src/
    App.tsx                 setzt die Seite zusammen
    data/objects.ts         alle kosmischen Objekte + echte Größen (Single Source of Truth)
    format.ts               Zahlen-/Maßstabs-Formatierung (de-DE)
    hooks/                  useReveal, useCountUp, useScrollProgress
    components/
      Starfield.tsx         animierter Canvas-Sternenhimmel
      Hero.tsx              Eröffnung mit Nebel + Titel-Reveal
      Intro.tsx             Übergang
      ScaleSection.tsx      eine Station der Reise
      ObjectSphere.tsx      leuchtende Kugel je Objekt
      ComparisonExplorer.tsx  interaktiver Vergleich
      ScrollProgress.tsx    Fortschritt + Maßstabsanzeige
      Footer.tsx            Abschluss
    index.css               Design-Tokens + komplettes Styling
```

## Daten

Alle Größen sind reale, gerundete astronomische Schätzwerte (Durchmesser in
Metern). Über 27 Zehnerpotenzen lässt sich nichts perfekt maßstabsgetreu auf
einem Bildschirm darstellen — deshalb übernehmen die Zahlen und Verhältnisse
die Erzählung der wahren Größe.
