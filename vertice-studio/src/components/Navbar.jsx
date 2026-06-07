import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { HiOutlineShoppingBag } from 'react-icons/hi'

const Navbar = () => {
  const { cartCount } = useCart()

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-heading text-lg font-medium tracking-widest uppercase text-brand-dark"
        >
          Vertice Studio
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xs tracking-[0.15em] uppercase text-gray-400 hover:text-brand-dark transition-colors hidden md:block"
          >
            Collection
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center text-brand-dark hover:opacity-60 transition-opacity"
          >
            <HiOutlineShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-brand-dark text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium leading-none">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
