import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

const ProductCard = ({ product }) => {
  const { id, name, price, image, category } = product
  const { addToCart } = useCart()

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-gray-50 aspect-square mb-4">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={e => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </Link>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-white text-brand-dark text-xs tracking-[0.15em] uppercase py-3.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div>
        <span className="text-[10px] tracking-[0.18em] uppercase text-brand-muted">
          {category}
        </span>
        <div className="flex items-start justify-between mt-1 gap-2">
          <h3 className="text-sm font-medium text-brand-dark leading-snug">
            {name}
          </h3>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-semibold text-brand-dark text-sm">
            ${price.toFixed(2)}
          </span>
          <Link
            to={`/product/${id}`}
            className="text-[11px] text-gray-400 hover:text-brand-dark transition-colors underline underline-offset-2"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
