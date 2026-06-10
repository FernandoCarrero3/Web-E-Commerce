import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../context/useAuth'
import { useProducts } from '../context/useProducts'
import { HiOutlineTrash, HiOutlinePlus, HiOutlineX } from 'react-icons/hi'

const PRODUCT_CATEGORIES = ['Abstract', 'Minimalist', 'Geometric']

const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  price: z.coerce.number().positive('Price must be a positive number'),
  category: z.enum(['Abstract', 'Minimalist', 'Geometric'], {
    errorMap: () => ({ message: 'Select a category' }),
  }),
  image: z.string().url('Enter a valid image URL'),
  description: z.string().min(10, 'Description is too short'),
})

const inputClass =
  'w-full border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-dark transition-colors'

const AdminDashboard = () => {
  const { user, signOut } = useAuth()
  const { products, loading, addProduct, deleteProduct } = useProducts()
  const [showForm, setShowForm] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(productSchema) })

  const onSubmit = async data => {
    const { error } = await addProduct(data)
    if (!error) {
      reset()
      setShowForm(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Admin header */}
      <header className="bg-brand-dark text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-heading text-lg">Vertice Studio</span>
          <span className="text-[10px] tracking-[0.25em] uppercase text-gray-400">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-xs text-gray-400 hidden sm:block">
            {user?.email}
          </span>
          <button
            onClick={signOut}
            className="text-[11px] tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Title row */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-3xl font-medium text-brand-dark">
              Products
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              {products.length} {products.length === 1 ? 'print' : 'prints'} in
              catalogue
            </p>
          </div>
          <button
            onClick={() => setShowForm(v => !v)}
            className="flex items-center gap-2 bg-brand-dark text-white text-[11px] tracking-[0.2em] uppercase px-5 py-3 hover:opacity-80 transition-opacity"
          >
            {showForm ? (
              <>
                <HiOutlineX size={14} /> Cancel
              </>
            ) : (
              <>
                <HiOutlinePlus size={14} /> Add Product
              </>
            )}
          </button>
        </div>

        {/* Add product form */}
        {showForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-gray-100 p-8 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <h2 className="text-[10px] tracking-[0.25em] uppercase text-gray-400 md:col-span-2 mb-2">
              New Product
            </h2>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">
                Name
              </label>
              <input
                type="text"
                placeholder="Abstract Shape Study"
                {...register('name')}
                className={inputClass}
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">
                Price (USD)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="29.99"
                {...register('price')}
                className={inputClass}
              />
              {errors.price && (
                <p className="mt-1 text-[11px] text-red-400">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">
                Category
              </label>
              <select {...register('category')} className={inputClass}>
                <option value="">Select category</option>
                {PRODUCT_CATEGORIES.map(c => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-[11px] text-red-400">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">
                Image URL
              </label>
              <input
                type="text"
                placeholder="https://picsum.photos/seed/my-art/800/800"
                {...register('image')}
                className={inputClass}
              />
              {errors.image && (
                <p className="mt-1 text-[11px] text-red-400">
                  {errors.image.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe this print..."
                {...register('description')}
                className={`${inputClass} resize-none`}
              />
              {errors.description && (
                <p className="mt-1 text-[11px] text-red-400">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-dark text-white text-[11px] tracking-[0.2em] uppercase px-8 py-3 hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        )}

        {/* Products grid */}
        {loading ? (
          <p className="text-sm text-gray-400">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 overflow-hidden group"
              >
                <div className="aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400">
                    {product.category}
                  </span>
                  <p className="text-sm font-medium text-brand-dark mt-0.5 truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-semibold text-brand-dark">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                      title="Delete product"
                    >
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
