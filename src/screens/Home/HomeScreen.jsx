import { Featured } from './sections/Featured'
import { Hero } from './sections/Hero'
import { Manifesto } from './sections/Manifesto'
import { SearchPanel } from './sections/SearchPanel'
import { VisitBand } from './sections/VisitBand'
import { Zones } from './sections/Zones'

export default function HomeScreen() {
  return (
    <>
      <Hero />
      <SearchPanel />
      <Featured />
      <Manifesto />
      <Zones />
      <VisitBand />
    </>
  )
}
