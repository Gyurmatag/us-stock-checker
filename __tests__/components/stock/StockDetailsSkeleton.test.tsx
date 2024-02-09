import { render, screen } from '@testing-library/react';
import StockDetailsSkeleton from '../../../components/stock/StockDetailsSkeleton';

describe('StockDetailsSkeleton', () => {
  it('renders the skeleton loader', () => {
    render(<StockDetailsSkeleton />);
    const skeletonElements = screen.getAllByRole('generic');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });
});
