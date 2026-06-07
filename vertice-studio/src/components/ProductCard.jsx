import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

const ProductCard = ({ product }) => {
  const { id, name, price, image } = product
  const { addToCart } = useCart()

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className="w-full h-64 object-cover" />
      </Link>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-brand-dark">{name}</h3>
        <p className="text-xl font-bold text-brand-accent my-2">${price}</p>
        <div className="mt-4 space-y-2">
          <Link
            to={`/product/${id}`}
            className="w-full text-center inline-block bg-brand-dark text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            View Details
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="w-full text-center inline-block bg-brand-accent text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
