import {
  screen,
  waitFor,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import { unknownSearch, productsForSecondPage } from 'src/test/handlers';
import renderWithoutRouter from 'src/test/renderWithoutRouter';
import renderWithProviders from 'src/test/renderWithProviders';

import ProductFeedPage from '.';

const routes = [{ path: '/products', element: <ProductFeedPage /> }];

describe('renders ProductFeedPage component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows progress bar on loading', async () => {
    await act(async () => {
      renderWithProviders(<ProductFeedPage />);
    });
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it(`shows ${productsForSecondPage} products on the second page`, async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/products?page=2'],
    });

    await act(async () => {
      renderWithoutRouter(<RouterProvider router={router} />);
    });

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toBeInTheDocument();

    await waitForElementToBeRemoved(progressBar);

    await waitFor(() => {
      const productsCounter = screen.getByTestId('products');

      expect(productsCounter).toBeInTheDocument();
      expect(productsCounter).toHaveTextContent(
        `${productsForSecondPage} products`
      );
    });
  });

  it('should show search term in the input', async () => {
    const searchTerm = 'dress';

    await act(async () => {
      const router = createMemoryRouter(routes, {
        initialEntries: [`/products?search=${searchTerm}`],
      });

      renderWithoutRouter(<RouterProvider router={router} />);
    });
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search');

      expect(searchInput).toBeInTheDocument();

      expect(searchInput).toHaveValue(searchTerm);
    });
  });

  it('should show no products found message for unknown search term', async () => {
    await act(async () => {
      const router = createMemoryRouter(routes, {
        initialEntries: [`/products?search=${unknownSearch}`],
      });

      renderWithoutRouter(<RouterProvider router={router} />);
    });

    await waitFor(() => {
      const noProducts = screen.getByText(/^No products found/i);

      expect(noProducts).toBeInTheDocument();
    });
  });
});
