import React, { useState, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useProducts } from '../context/useProducts'
import { CATEGORIES } from '../data'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import { FiSearch } from 'react-icons/fi'
import heroImg from '../assets/images/product1.jpg'

const ease = [0.25, 0.1, 0.25, 1]

const heroVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
}

const heroItem = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
}

const Home = () => {
  const { products, loading } = useProducts()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 600], [0, 180])

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
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] max-h-[960px] text-white overflow-hidden flex flex-col">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 scale-110 origin-center"
          style={{ y: parallaxY }}
        >
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

        {/* Top bar */}
        <motion.div
          className="relative z-10 flex items-center justify-between px-8 md:px-14 pt-8"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[10px] tracking-[0.45em] uppercase text-white/50">
            Vertice Studio
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/35">
            The Collection &middot; 2025
          </span>
        </motion.div>

        {/* Main content */}
        <motion.div
          className="relative z-10 flex flex-col justify-center flex-grow px-8 md:px-14 pb-4"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated line */}
          <motion.div
            className="h-px bg-white/30 mb-7 origin-left"
            initial={{ scaleX: 0, width: '3rem' }}
            animate={{ scaleX: 1, width: '3rem' }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          />

          <motion.p
            className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-6 italic"
            variants={heroItem}
          >
            Original Digital Prints
          </motion.p>

          <motion.h1
            className="font-heading font-medium leading-[1.0] max-w-3xl mb-8"
            variants={heroItem}
          >
            <span className="block text-[13vw] md:text-[7.5rem] lg:text-[9rem]">
              Art for walls
            </span>
            <span className="block text-[13vw] md:text-[7.5rem] lg:text-[9rem] italic font-normal text-white/70">
              that say something.
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed"
            variants={heroItem}
          >
            Each piece crafted for modern interiors —<br />
            every room a gallery.
          </motion.p>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="relative z-10 flex items-end justify-between px-8 md:px-14 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
        >
          {/* CTA */}
          <motion.a
            href="#collection"
            className="group inline-flex items-center gap-4 border border-white/20 text-white text-[11px] tracking-[0.25em] uppercase px-7 py-3.5 hover:bg-white hover:text-brand-dark transition-colors duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore Collection
            <motion.span
              className="inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Scroll indicator */}
          <div className="hidden md:flex flex-col items-center gap-3">
            <div className="w-px h-14 bg-white/15 relative overflow-hidden rounded-full">
              <motion.div
                className="w-full bg-white/50 rounded-full"
                style={{ height: '40%' }}
                animate={{ y: ['0%', '160%', '0%'] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <span className="text-[9px] tracking-[0.35em] uppercase text-white/30">
              scroll
            </span>
          </div>

          {/* Catalog ref */}
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="font-heading text-3xl md:text-4xl text-white/20 font-medium leading-none">
              {String(products.length).padStart(2, '0')}
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">
              prints available
            </span>
          </div>
        </motion.div>
      </section>

      {/* ── COLLECTION ── */}
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

        {/* Products grid */}
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
