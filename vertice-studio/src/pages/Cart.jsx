import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/useCart'
import { Link } from 'react-router-dom'
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX } from 'react-icons/hi'

const Cart = () => {
  const { cartItems, cartTotal, addToCart, decrementItem, removeFromCart } =
    useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center max-w-md">
        <p className="font-heading text-3xl text-brand-dark mb-4">
          Your cart is empty
        </p>
        <p className="text-gray-400 text-sm mb-10">
          Discover our collection of original digital prints.
        </p>
        <Link
          to="/"
          className="inline-block bg-brand-dark text-white text-[11px] tracking-[0.2em] uppercase px-8 py-3.5 hover:opacity-80 transition-opacity"
        >
          Browse Collection
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <h1 className="font-heading text-3xl font-medium text-brand-dark mb-12">
        Shopping Cart
        <span className="font-sans text-sm font-normal text-gray-400 ml-3">
          ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Items */}
        <div className="lg:col-span-2 divide-y divide-gray-100">
          <AnimatePresence initial={false}>
            {cartItems.map(item => (
              <motion.div
                key={item.id}
                className="py-6 flex gap-5 items-start"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover bg-gray-50 flex-shrink-0"
                />
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400">
                        {item.category}
                      </p>
                      <h3 className="font-medium text-brand-dark mt-0.5 text-sm">
                        {item.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-brand-dark transition-colors ml-4 flex-shrink-0"
                    >
                      <HiOutlineX size={15} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decrementItem(item.id)}
                        className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:border-brand-dark transition-colors"
                      >
                        <HiOutlineMinus size={11} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 border border-gray-200 flex items-center justify-center hover:border-brand-dark transition-colors"
                      >
                        <HiOutlinePlus size={11} />
                      </button>
                    </div>
                    <span className="font-semibold text-brand-dark text-sm">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-brand-light p-8">
            <h2 className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-xs">
                  <span className="text-gray-500 truncate mr-4">
                    {item.name} &times; {item.quantity}
                  </span>
                  <span className="text-brand-dark flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-brand-dark">
                  Total
                </span>
                <span className="font-semibold text-lg text-brand-dark">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="w-full block text-center bg-brand-dark text-white py-3.5 text-[11px] tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/"
              className="w-full block text-center text-xs text-gray-400 hover:text-brand-dark transition-colors mt-4 tracking-wide"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
