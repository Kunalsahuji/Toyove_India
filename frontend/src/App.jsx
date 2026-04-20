import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { VisionHeader } from './components/layout/VisionHeader'
import { Footer }       from './components/layout/Footer'
import { HomePage }     from './pages/HomePage'
import { AboutPage }    from './pages/AboutPage'
import { ContactPage }  from './pages/ContactPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ReturnPolicy } from './pages/ReturnPolicy'
import { ShippingPolicy } from './pages/ShippingPolicy'
import { TermsConditions } from './pages/TermsConditions'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { FAQPage } from './pages/FAQPage'
import { WishlistPage } from './pages/WishlistPage'
import { SearchPage } from './pages/SearchPage'
import { CollectionPage } from './pages/CollectionPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { AccountPage } from './pages/AccountPage'
import { CartPage } from './pages/CartPage'
import { AuthProvider } from './context/AuthContext'

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FDF4E6] overflow-x-hidden">
          <VisionHeader />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product/:title" element={<ProductDetailPage />} />
              
              {/* Legal & Informational Pages */}
              <Route path="/pages/return-exchange" element={<ReturnPolicy />} />
              <Route path="/pages/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/pages/terms-conditions" element={<TermsConditions />} />
              <Route path="/pages/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/pages/faq" element={<FAQPage />} />
              
              {/* Utility Pages */}
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/search" element={<SearchPage />} />
              
              {/* Collection / Category Pages */}
              <Route path="/collections/:category" element={<CollectionPage />} />

              {/* Auth Pages */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/cart" element={<CartPage />} />

              {/* Fallback to home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}
