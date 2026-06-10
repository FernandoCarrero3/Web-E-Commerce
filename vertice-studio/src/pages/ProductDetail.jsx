import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProducts } from '../context/useProducts'
import { useCart } from '../context/useCart'

const ProductDetail = () => {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const { addToCart } = useCart()

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="animate-pulse">
          <div className="h-3 bg-gray-100 rounded w-20 mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="aspect-square bg-gray-100" />
            <div className="space-y-4 md:pt-4">
              <div className="h-2.5 bg-gray-100 rounded w-20" />
              <div className="h-8 bg-gray-100 rounded w-64" />
              <div className="h-6 bg-gray-100 rounded w-24" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-4/5" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <p className="text-gray-400 mb-4 text-sm">
          This print no longer exists.
        </p>
        <Link
          to="/"
          className="text-xs uppercase tracking-widest underline underline-offset-4 text-brand-dark"
        >
          Back to collection
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-5xl">
      <Link
        to="/"
        className="text-[11px] text-gray-400 hover:text-brand-dark transition-colors tracking-[0.15em] uppercase inline-flex items-center gap-2 mb-12"
      >
        &larr; Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <motion.div
          className="bg-gray-50 overflow-hidden"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto"
          />
        </motion.div>

        <motion.div
          className="md:pt-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-brand-muted">
            {product.category}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-medium text-brand-dark mt-2 mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-brand-dark mb-8">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-gray-500 leading-relaxed mb-10 text-sm max-w-sm">
            {product.description}
          </p>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-brand-dark text-white py-4 text-[11px] tracking-[0.25em] uppercase hover:opacity-80 transition-opacity mb-4"
          >
            Add to Cart
          </button>
          <Link
            to="/cart"
            className="w-full block text-center border border-gray-200 text-brand-dark py-4 text-[11px] tracking-[0.25em] uppercase hover:border-brand-dark transition-colors"
          >
            View Cart
          </Link>

          <div className="mt-10 pt-8 border-t border-gray-100 space-y-3">
            {[
              { label: 'Format', value: 'Digital Print · High Resolution' },
              { label: 'License', value: 'Personal Use' },
              { label: 'Category', value: product.category },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="text-gray-400 uppercase tracking-wider">
                  {label}
                </span>
                <span className="text-brand-dark">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProductDetail
