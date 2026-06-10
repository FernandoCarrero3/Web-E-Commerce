import React from 'react'

const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-square bg-gray-100 mb-4" />
    <div className="h-2 bg-gray-100 rounded w-14 mb-2.5" />
    <div className="h-3 bg-gray-100 rounded w-36 mb-1.5" />
    <div className="h-3 bg-gray-100 rounded w-20" />
  </div>
)

export default ProductSkeleton
