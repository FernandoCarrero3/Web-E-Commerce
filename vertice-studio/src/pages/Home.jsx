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
    <>
      {/* Hero */}
      <section className="bg-brand-dark text-white">
        <div className="container mx-auto px-6 py-28 md:py-40">
          <p className="text-[10px] tracking-[0.4em] uppercase text-gray-500 mb-6">
            The Collection &mdash; 2025
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-medium leading-[1.1] max-w-2xl mb-8">
            Art for walls
            <br />
            <em className="font-normal italic">that say something.</em>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed mb-12">
            Original digital prints crafted for modern interiors. Each piece a
            statement, every room a gallery.
          </p>
          <a
            href="#collection"
            className="inline-block border border-white/25 text-white text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-white hover:text-brand-dark transition-colors duration-300"
          >
            Explore Collection
          </a>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="container mx-auto px-6 py-16">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8 border-b border-gray-100 pb-6">
          <div className="flex gap-7 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm pb-1 border-b-2 transition-colors ${
                  activeCategory === cat
                    ? 'border-brand-dark text-brand-dark font-medium'
                    : 'border-transparent text-gray-400 hover:text-brand-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-52">
            <FiSearch
              className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
              size={13}
            />
            <input
              type="text"
              placeholder="Search prints..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent pl-5 pb-1.5 border-b border-gray-200 focus:border-brand-dark focus:outline-none text-sm placeholder-gray-300 transition-colors"
            />
          </div>
        </div>

        <p className="text-xs text-gray-400 tracking-wide mb-10">
          {filtered.length} {filtered.length === 1 ? 'print' : 'prints'}{' '}
          available
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-400 text-sm mb-5">
              No prints found for &ldquo;{search}&rdquo;
            </p>
            <button
              onClick={() => {
                setSearch('')
                setActiveCategory('All')
              }}
              className="text-[11px] tracking-[0.2em] uppercase border-b border-brand-dark text-brand-dark hover:opacity-50 transition-opacity"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  )
}

export default Home
