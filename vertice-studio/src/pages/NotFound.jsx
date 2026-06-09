import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center py-40">
      <p className="text-[10px] tracking-[0.4em] uppercase text-gray-400 mb-6">
        Error 404
      </p>
      <h1 className="font-heading text-7xl md:text-9xl font-medium text-brand-dark leading-none mb-6">
        404
      </h1>
      <p className="font-heading text-xl md:text-2xl text-gray-400 italic mb-4">
        This page doesn&apos;t exist.
      </p>
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-12">
        The page you&apos;re looking for may have been moved, deleted, or never
        existed in the first place.
      </p>
      <Link
        to="/"
        className="inline-block bg-brand-dark text-white text-[11px] tracking-[0.25em] uppercase px-10 py-3.5 hover:opacity-80 transition-opacity"
      >
        Back to Collection
      </Link>
    </div>
  )
}

export default NotFound
