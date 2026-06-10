import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCart } from '../context/useCart'
import { useNavigate, Link } from 'react-router-dom'

const checkoutSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  email: z.string().email('Enter a valid email address'),
  address: z.string().min(5, 'Enter a valid shipping address'),
  card: z
    .string()
    .regex(
      /^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/,
      'Enter a valid 16-digit card number'
    ),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format must be MM/YY'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
})

const labelClass =
  'block text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2'

const inputClass = hasError =>
  `w-full border-b bg-transparent py-2 text-sm outline-none transition-colors placeholder-gray-300 ${
    hasError
      ? 'border-red-400 focus:border-red-500'
      : 'border-gray-200 focus:border-brand-dark'
  }`

const FieldError = ({ message }) =>
  message ? (
    <p className="mt-1.5 text-[11px] text-red-400 tracking-wide">{message}</p>
  ) : null

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  })

  const onSubmit = () => {
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-3 space-y-10"
        >
          {/* Billing Details */}
          <div>
            <h2 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-7">
              Billing Details
            </h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Jane Smith"
                  {...register('name')}
                  className={inputClass(errors.name)}
                />
                <FieldError message={errors.name?.message} />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  {...register('email')}
                  className={inputClass(errors.email)}
                />
                <FieldError message={errors.email?.message} />
              </div>

              <div>
                <label htmlFor="address" className={labelClass}>
                  Shipping Address
                </label>
                <input
                  id="address"
                  type="text"
                  placeholder="123 Main St, London"
                  {...register('address')}
                  className={inputClass(errors.address)}
                />
                <FieldError message={errors.address?.message} />
              </div>
            </div>
          </div>

          {/* Payment Details */}
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
                  id="card"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  {...register('card')}
                  className={inputClass(errors.card)}
                />
                <FieldError message={errors.card?.message} />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expiry" className={labelClass}>
                    Expiry (MM/YY)
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="12/26"
                    maxLength={5}
                    {...register('expiry')}
                    className={inputClass(errors.expiry)}
                  />
                  <FieldError message={errors.expiry?.message} />
                </div>
                <div>
                  <label htmlFor="cvc" className={labelClass}>
                    CVC
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    placeholder="123"
                    maxLength={4}
                    {...register('cvc')}
                    className={inputClass(errors.cvc)}
                  />
                  <FieldError message={errors.cvc?.message} />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-dark text-white py-4 text-[11px] tracking-[0.25em] uppercase hover:opacity-80 transition-opacity disabled:opacity-50"
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
