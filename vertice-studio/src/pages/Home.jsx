import React, { useState, useMemo } from 'react'
import { products, CATEGORIES } from '../data'
import ProductCard from '../components/ProductCard'
import { FiSearch } from 'react-icons/fi'

const Home = () => {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase().trim())
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8 text-brand-dark">
        Our Collection
      </h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        {/* Search bar */}
        <div className="relative w-full md:w-72">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search prints..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-brand-accent text-white'
                  : 'bg-white border border-gray-300 text-gray-600 hover:border-brand-accent hover:text-brand-accent'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-6">
        {filtered.length} {filtered.length === 1 ? 'print' : 'prints'} found
      </p>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            No prints found for &ldquo;{search}&rdquo;.
          </p>
          <button
            onClick={() => {
              setSearch('')
              setActiveCategory('All')
            }}
            className="mt-4 text-brand-accent hover:underline text-sm"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Home
