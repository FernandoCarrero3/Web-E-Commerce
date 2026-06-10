import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useProducts } from '../context/useProducts'
import { CATEGORIES } from '../data'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import { FiSearch } from 'react-icons/fi'
import heroImg from '../assets/images/product1.jpg'

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const Home = () => {
  const { products, loading } = useProducts()
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
  }, [products, search, activeCategory])

  return (
    <>
      {/* Hero */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <motion.div
          className="relative container mx-auto px-6 py-28 md:py-40"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-[10px] tracking-[0.4em] uppercase text-gray-500 mb-6"
            variants={heroItem}
          >
            The Collection &mdash; 2025
          </motion.p>
          <motion.h1
            className="font-heading text-5xl md:text-7xl font-medium leading-[1.1] max-w-2xl mb-8"
            variants={heroItem}
          >
            Art for walls
            <br />
            <em className="font-normal italic">that say something.</em>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed mb-12"
            variants={heroItem}
          >
            Original digital prints crafted for modern interiors. Each piece a
            statement, every room a gallery.
          </motion.p>
          <motion.a
            href="#collection"
            className="inline-block border border-white/25 text-white text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-white hover:text-brand-dark transition-colors duration-300"
            variants={heroItem}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Collection
          </motion.a>
        </motion.div>
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

        {!loading && (
          <p className="text-xs text-gray-400 tracking-wide mb-10">
            {filtered.length} {filtered.length === 1 ? 'print' : 'prints'}{' '}
            available
          </p>
        )}

        {/* Skeleton grid */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Products grid — staggered fade-up */}
        {!loading && filtered.length > 0 && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map(product => (
              <motion.div key={product.id} variants={cardVariant}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <motion.div
            className="text-center py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        )}
      </section>
    </>
  )
}

export default Home
