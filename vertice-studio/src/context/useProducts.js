import { useContext } from 'react'
import { ProductsContext } from './productsContext'
export const useProducts = () => useContext(ProductsContext)
