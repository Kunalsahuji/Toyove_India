import { VisionHeader } from './components/layout/VisionHeader'
import { Footer }       from './components/layout/Footer'
import { HomePage }     from './pages/HomePage'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <VisionHeader />
      <main className="flex-grow">
        <HomePage />
      </main>
      <Footer />
    </div>
  )
}

export default App
