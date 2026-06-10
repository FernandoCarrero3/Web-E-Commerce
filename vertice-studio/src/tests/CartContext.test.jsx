import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider } from '../context/CartContext.jsx'
import { useCart } from '../context/useCart'

vi.mock('react-hot-toast', () => {
  const toast = vi.fn()
  toast.success = vi.fn()
  toast.error = vi.fn()
  return { default: toast }
})

const productA = { id: 1, name: 'Abstract Shape Study', price: 29.99 }
const productB = { id: 2, name: 'Minimal Horizon', price: 19.99 }

const CartDisplay = () => {
  const {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    decrementItem,
  } = useCart()
  return (
    <div>
      <span data-testid="count">{cartCount}</span>
      <span data-testid="total">{cartTotal.toFixed(2)}</span>
      {cartItems.map(item => (
        <div key={item.id} data-testid={`item-${item.id}`}>
          {item.name} x{item.quantity}
        </div>
      ))}
      <button onClick={() => addToCart(productA)}>add-a</button>
      <button onClick={() => addToCart(productB)}>add-b</button>
      <button onClick={() => removeFromCart(productA.id)}>remove-a</button>
      <button onClick={() => decrementItem(productA.id)}>decrement-a</button>
    </div>
  )
}

const renderCart = () =>
  render(
    <CartProvider>
      <CartDisplay />
    </CartProvider>
  )

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with an empty cart', () => {
    renderCart()
    expect(screen.getByTestId('count').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0.00')
  })

  it('adds a product to the cart', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('add-a'))
    expect(screen.getByTestId('count').textContent).toBe('1')
    expect(screen.getByTestId('item-1').textContent).toBe(
      'Abstract Shape Study x1'
    )
  })

  it('increments quantity when the same product is added twice', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('add-a'))
    await user.click(screen.getByText('add-a'))
    expect(screen.getByTestId('count').textContent).toBe('2')
    expect(screen.getByTestId('item-1').textContent).toBe(
      'Abstract Shape Study x2'
    )
  })

  it('calculates total correctly with multiple products', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('add-a'))
    await user.click(screen.getByText('add-b'))
    expect(screen.getByTestId('total').textContent).toBe('49.98')
  })

  it('removes a product from the cart', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('add-a'))
    await user.click(screen.getByText('remove-a'))
    expect(screen.getByTestId('count').textContent).toBe('0')
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument()
  })

  it('decrements quantity by one', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('add-a'))
    await user.click(screen.getByText('add-a'))
    await user.click(screen.getByText('decrement-a'))
    expect(screen.getByTestId('item-1').textContent).toBe(
      'Abstract Shape Study x1'
    )
  })

  it('removes item when decremented to zero', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('add-a'))
    await user.click(screen.getByText('decrement-a'))
    expect(screen.queryByTestId('item-1')).not.toBeInTheDocument()
    expect(screen.getByTestId('count').textContent).toBe('0')
  })

  it('persists cart to localStorage', async () => {
    const user = userEvent.setup()
    renderCart()
    await user.click(screen.getByText('add-a'))
    const stored = JSON.parse(localStorage.getItem('cartItems'))
    expect(stored).toHaveLength(1)
    expect(stored[0].id).toBe(1)
  })
})
