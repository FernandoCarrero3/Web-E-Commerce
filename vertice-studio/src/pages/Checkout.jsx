import React from 'react'
import { useCart } from '../context/useCart'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    clearCart()
    navigate('/order-success')
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold my-8 text-center text-brand-dark">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-brand-dark mb-6">
            Billing Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Shipping Address
              </label>
              <input
                type="text"
                id="address"
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <fieldset className="pt-4">
              <legend className="text-lg font-medium text-brand-dark">
                Payment Details (Demo)
              </legend>
              <p className="text-sm text-gray-500 mb-4">
                Use fake data. This is for simulation only.
              </p>
              <div>
                <label
                  htmlFor="card"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="card"
                  placeholder="1234 5678 9012 3456"
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="12/26"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    placeholder="123"
                    required
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>
            </fieldset>

            <button
              type="submit"
              className="w-full bg-brand-accent text-white py-3 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors mt-6"
            >
              Confirm and Pay ${cartTotal.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
          <h2 className="text-2xl font-bold text-brand-dark mb-6">
            Your Order
          </h2>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold text-brand-dark">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <hr className="my-6" />
          <div className="flex justify-between items-center text-2xl font-bold">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
