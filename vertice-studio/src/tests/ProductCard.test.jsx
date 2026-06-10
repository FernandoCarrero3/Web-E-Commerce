import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartContext } from '../context/cartContext'
import ProductCard from '../components/ProductCard'

const mockProduct = {
  id: 1,
  name: 'Abstract Shape Study',
  price: 29.99,
  category: 'Abstract',
  image: 'https://picsum.photos/seed/abstract/800/800',
  description: 'A test product description',
}

const renderWithProviders = ui =>
  render(
    <MemoryRouter>
      <CartContext.Provider value={{ addToCart: vi.fn() }}>
        {ui}
      </CartContext.Provider>
    </MemoryRouter>
  )

describe('ProductCard', () => {
  it('renders the product name', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Abstract Shape Study')).toBeInTheDocument()
  })

  it('renders the formatted price', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$29.99')).toBeInTheDocument()
  })

  it('renders the category label', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Abstract')).toBeInTheDocument()
  })

  it('renders the product image with correct alt text', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(screen.getByAltText('Abstract Shape Study')).toBeInTheDocument()
  })

  it('renders a Details link pointing to the product page', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    const detailsLink = screen.getByRole('link', { name: /details/i })
    expect(detailsLink).toHaveAttribute('href', '/product/1')
  })

  it('renders the Add to Cart button', () => {
    renderWithProviders(<ProductCard product={mockProduct} />)
    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument()
  })
})
