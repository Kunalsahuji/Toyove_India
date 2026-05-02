import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import React, { useEffect, Suspense } from 'react'
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
import { CheckoutPage } from './pages/CheckoutPage'
import { OrderSuccessPage } from './pages/OrderSuccessPage'
import { ComparePage } from './pages/ComparePage'
import { AllCategoriesPage } from './pages/AllCategoriesPage'
import { AuthProvider } from './context/AuthContext'
import { MobileBottomBar } from './components/layout/MobileBottomBar'
import { AsideSidebar } from './components/layout/AsideSidebar'
import { PurchaseNotification } from './components/ui/PurchaseNotification'

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

import { CartProvider } from './context/CartContext'
import { PaymentProvider } from './context/PaymentContext'
import { ToastProvider } from './context/ToastContext'

// Lazy load admin module
const AdminLayout = React.lazy(() => import('./admin/AdminLayout').then(m => ({ default: m.AdminLayout })))
const AdminDashboard = React.lazy(() => import('./admin/pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })))
const AdminUsers = React.lazy(() => import('./admin/pages/AdminUsers').then(m => ({ default: m.AdminUsers })))
const AdminUserDetail = React.lazy(() => import('./admin/pages/AdminUserDetail').then(m => ({ default: m.AdminUserDetail })))
const AdminProducts = React.lazy(() => import('./admin/pages/AdminProducts').then(m => ({ default: m.AdminProducts })))
const AdminProductDetail = React.lazy(() => import('./admin/pages/AdminProductDetail').then(m => ({ default: m.AdminProductDetail })))
const AdminOrders = React.lazy(() => import('./admin/pages/AdminOrders').then(m => ({ default: m.AdminOrders })))
const AdminOrderDetail = React.lazy(() => import('./admin/pages/AdminOrderDetail').then(m => ({ default: m.AdminOrderDetail })))
const AdminTransactions = React.lazy(() => import('./admin/pages/AdminTransactions').then(m => ({ default: m.AdminTransactions })))
const AdminFinance = React.lazy(() => import('./admin/pages/AdminFinance').then(m => ({ default: m.AdminFinance })))
const AdminSettings = React.lazy(() => import('./admin/pages/AdminSettings').then(m => ({ default: m.AdminSettings })))
const AdminNotifications = React.lazy(() => import('./admin/pages/AdminNotifications').then(m => ({ default: m.AdminNotifications })))
const AdminTransactionDetail = React.lazy(() => import('./admin/pages/AdminTransactionDetail').then(m => ({ default: m.AdminTransactionDetail })))
const AdminReports = React.lazy(() => import('./admin/pages/AdminReports').then(m => ({ default: m.AdminReports })))
const AdminSystemLogs = React.lazy(() => import('./admin/pages/AdminSystemLogs').then(m => ({ default: m.AdminSystemLogs })))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

const AdminFallback = () => (
  <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FDF4E6]">
    <div className="w-12 h-12 border-4 border-white border-t-[#6651A4] rounded-full animate-spin shadow-md mb-4"></div>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Workspace...</p>
  </div>
)

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PaymentProvider>
          <Router>
            <ToastProvider>
              <AppContent />
            </ToastProvider>
          </Router>
        </PaymentProvider>
      </CartProvider>
    </AuthProvider>
  )
}

function AppContent() {
  const location = useLocation()
  const isCheckout = location.pathname === '/checkout'
  const isAdmin = location.pathname.startsWith('/admin')
  const hideLayouts = isCheckout || isAdmin

  // If we are entirely inside admin, we don't need the flex-col bg-[#FDF4E6] wrapper of the user site,
  // but it's okay because AdminLayout fills the screen anyway. Let's just conditionally render components.

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <Suspense fallback={<AdminFallback />}>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/:id" element={<AdminUserDetail />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/:id" element={<AdminProductDetail />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="finance" element={<AdminFinance />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="transactions" element={<AdminTransactions />} />
              <Route path="transactions/:id" element={<AdminTransactionDetail />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="system-logs" element={<AdminSystemLogs />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </>
    )
  }

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FDF4E6] overflow-x-hidden relative">
        {!hideLayouts && <VisionHeader />}
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
            <Route path="/collections/:category/:subcategory?" element={<CollectionPage />} />

            {/* Auth Pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/all-categories" element={<AllCategoriesPage />} />

            {/* Fallback to 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        {!hideLayouts && <Footer />}
        {!hideLayouts && <MobileBottomBar />}
        {!hideLayouts && <AsideSidebar />}
        {!hideLayouts && <PurchaseNotification />}
      </div>
    </>
  )
}
