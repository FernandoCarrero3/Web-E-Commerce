import React from 'react'
import { useCart } from '../context/useCart'
import { useNavigate, Link } from 'react-router-dom'

const inputClass =
  'w-full border-b border-gray-200 focus:border-brand-dark bg-transparent py-2 text-sm outline-none transition-colors placeholder-gray-300'
const labelClass =
  'block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2'

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    clearCart()
    navigate('/order-success')
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <Link
        to="/cart"
        className="text-[11px] text-gray-400 hover:text-brand-dark transition-colors tracking-[0.15em] uppercase inline-flex items-center gap-2 mb-12"
      >
        &larr; Cart
      </Link>

      <h1 className="font-heading text-3xl font-medium text-brand-dark mb-12">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-10">
          <div>
            <h2 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-7">
              Billing Details
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>
                <input type="text" id="name" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="address" className={labelClass}>
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-2">
              Payment Details
            </h2>
            <p className="text-xs text-gray-400 mb-7">
              Demo only &mdash; use any fake card number.
            </p>
            <div className="space-y-6">
              <div>
                <label htmlFor="card" className={labelClass}>
                  Card Number
                </label>
                <input
                  type="text"
                  id="card"
                  placeholder="1234 5678 9012 3456"
                  required
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expiry" className={labelClass}>
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="12/26"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className={labelClass}>
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    placeholder="123"
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-dark text-white py-4 text-[11px] tracking-[0.25em] uppercase hover:opacity-80 transition-opacity"
          >
            Confirm and Pay &mdash; ${cartTotal.toFixed(2)}
          </button>
        </form>

        {/* Order summary */}
        <div className="lg:col-span-2">
          <div className="bg-brand-light p-8 sticky top-24">
            <h2 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6">
              Your Order
            </h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <p className="text-xs font-medium text-brand-dark truncate">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-brand-dark flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-6 pt-5 flex justify-between items-center">
              <span className="text-sm font-medium text-brand-dark">Total</span>
              <span className="font-semibold text-brand-dark">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
