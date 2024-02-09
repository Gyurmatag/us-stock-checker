import { render, screen, waitFor, act } from '@testing-library/react';
import StockDetails from '@/components/stock/StockDetails';

global.fetch = jest.fn();

const mockFetchData = {
  companyProfileData: { name: 'Apple Inc.' },
  stockPriceData: {
    c: 150.12,
    d: 2.34,
    dp: 1.58,
    pc: 148.78,
    o: 149.0,
    h: 151.0,
    l: 147.5,
  },
  companyPeersData: ['AAPL', 'MSFT', 'GOOGL', 'AMZN'],
};

beforeEach(() => {
  (fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.includes('/stock/profile2')) {
      return Promise.resolve({
        json: () => Promise.resolve(mockFetchData.companyProfileData),
      });
    } else if (url.includes('/quote')) {
      return Promise.resolve({
        json: () => Promise.resolve(mockFetchData.stockPriceData),
      });
    } else if (url.includes('/stock/peers')) {
      return Promise.resolve({
        json: () => Promise.resolve(mockFetchData.companyPeersData),
      });
    } else {
      return Promise.reject(new Error('Invalid request'));
    }
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('StockDetails', () => {
  it('renders stock details correctly', async () => {
    // @ts-ignore
    // WORKAROUND - https://stackoverflow.com/a/76253176
    render(await StockDetails({ ticker: 'AAPL' }));

    await waitFor(() => {
      expect(screen.getByText('Apple Inc.')).toBeInTheDocument();
      expect(screen.getByText('150.12')).toBeInTheDocument();
      expect(screen.getByText('(1.58%)')).toBeInTheDocument();
      expect(screen.getByText('Previous Close:')).toBeInTheDocument();
      expect(screen.getByText('148.78')).toBeInTheDocument();
    });

    expect(screen.getByText('MSFT')).toBeInTheDocument();
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
    expect(screen.getByText('AMZN')).toBeInTheDocument();
  });
});
