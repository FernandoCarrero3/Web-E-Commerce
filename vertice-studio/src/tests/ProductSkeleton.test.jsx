import { render } from '@testing-library/react'
import ProductSkeleton from '../components/ProductSkeleton'

describe('ProductSkeleton', () => {
  it('renders without crashing', () => {
    const { container } = render(<ProductSkeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('includes the animate-pulse class for the loading effect', () => {
    const { container } = render(<ProductSkeleton />)
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  it('renders multiple skeleton blocks to mimic card layout', () => {
    const { container } = render(<ProductSkeleton />)
    const blocks = container.querySelectorAll('.bg-gray-100')
    expect(blocks.length).toBeGreaterThanOrEqual(3)
  })
})
