import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.jsx'
import { ProductsProvider } from './context/ProductsContext.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2500,
            style: {
              background: '#111111',
              color: '#ffffff',
              fontSize: '12px',
              letterSpacing: '0.03em',
              borderRadius: '0',
              padding: '12px 16px',
              boxShadow: 'none',
            },
            success: {
              iconTheme: { primary: '#ffffff', secondary: '#111111' },
            },
          }}
        />

        {/* Admin routes — no Navbar/Footer */}
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Public routes */}
          <Route
            path="/*"
            element={
              <div className="min-h-screen flex flex-col bg-white text-brand-dark">
                <Navbar />
                <main className="flex-grow">
                  <AnimatedRoutes />
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </ProductsProvider>
    </AuthProvider>
  )
}

export default App
