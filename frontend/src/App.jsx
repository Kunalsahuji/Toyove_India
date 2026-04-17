import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { VisionHeader } from './components/layout/VisionHeader'
import { Footer }       from './components/layout/Footer'
import { HomePage }     from './pages/HomePage'
import { AboutPage }    from './pages/AboutPage'
import { ContactPage }  from './pages/ContactPage'
import { ProductDetailPage } from './pages/ProductDetailPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-brand-cream overflow-x-hidden">
        <VisionHeader />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/product/:title" element={<ProductDetailPage />} />
            {/* Fallback to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
