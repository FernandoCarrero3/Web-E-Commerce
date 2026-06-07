import React from 'react'
import { Link } from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-6 py-32 text-center max-w-lg">
      <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center mx-auto mb-10">
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <p className="text-[10px] tracking-[0.35em] uppercase text-gray-400 mb-4">
        Order Confirmed
      </p>
      <h1 className="font-heading text-4xl md:text-5xl font-medium text-brand-dark mb-6 leading-tight">
        Thank you for
        <br />
        <em className="font-normal italic">your order.</em>
      </h1>
      <p className="text-gray-400 text-sm leading-relaxed mb-14 max-w-xs mx-auto">
        Your payment was successful and your prints are on their way. A
        confirmation has been sent to your email.
      </p>
      <Link
        to="/"
        className="inline-block bg-brand-dark text-white text-[11px] tracking-[0.25em] uppercase px-10 py-3.5 hover:opacity-80 transition-opacity"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

export default OrderSuccess
