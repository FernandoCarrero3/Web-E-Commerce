import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { ProductsContext } from './productsContext'

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      setError(error.message)
    } else {
      setProducts(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const addProduct = async product => {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single()

    if (error) {
      toast.error('Failed to add product')
    } else {
      setProducts(prev => [...prev, data])
      toast.success(`"${data.name}" added`)
    }
    return { data, error }
  }

  const deleteProduct = async id => {
    const product = products.find(p => p.id === id)
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      toast.error('Failed to delete product')
    } else {
      setProducts(prev => prev.filter(p => p.id !== id))
      toast(`"${product?.name}" deleted`, { icon: '×' })
    }
    return { error }
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        deleteProduct,
        refetch: fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
