import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark">
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
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
