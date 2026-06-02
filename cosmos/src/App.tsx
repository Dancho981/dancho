import { Starfield } from './components/Starfield'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { Intro } from './components/Intro'
import { ScaleSection } from './components/ScaleSection'
import { ComparisonExplorer } from './components/ComparisonExplorer'
import { Footer } from './components/Footer'
import { OBJECTS } from './data/objects'

export default function App() {
  return (
    <>
      <Starfield />
      <ScrollProgress />

      <main>
        <Hero />
        <Intro />

        <div className="journey">
          {OBJECTS.map((obj, i) => (
            <ScaleSection
              key={obj.id}
              obj={obj}
              index={i}
              prev={i > 0 ? OBJECTS[i - 1] : null}
            />
          ))}
        </div>

        <ComparisonExplorer />
        <Footer />
      </main>
    </>
  )
}
