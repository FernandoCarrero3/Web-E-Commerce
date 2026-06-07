import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white mt-24">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="font-heading text-xl font-medium tracking-widest uppercase mb-4">
              Vertice Studio
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Original digital art prints crafted for modern interiors. Each
              piece designed to bring intention and beauty to your walls.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-5">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  All Prints
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Abstract
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Minimalist
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Geometric
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-5">
              Information
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="cursor-default">Shipping &amp; Returns</li>
              <li className="cursor-default">Print Quality</li>
              <li className="cursor-default">FAQ</li>
              <li className="cursor-default">Contact</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            &copy; 2025 Vértice Studio. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Fictional portfolio project &mdash; not a real store.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
