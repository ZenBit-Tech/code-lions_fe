import { screen, fireEvent } from '@testing-library/react';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';

import renderWithoutRouter from 'src/test/renderWithoutRouter';
import renderWithProviders from 'src/test/renderWithProviders';

import Header from '.';

const routes = [
  { path: '/', element: <Header /> },
  { path: '/products', element: <div>Shop Page</div> },
  { path: '/signin', element: <div>Sign in Page</div> },
  { path: '/signup', element: <div>Sign up Page</div> },
];

describe('Header', () => {
  test('renders header with links and buttons', () => {
    renderWithProviders(<Header />);

    expect(screen.getByText(/Black Circle/i)).toBeInTheDocument();

    expect(screen.getByText(/shop/i)).toBeInTheDocument();
    expect(screen.getByText(/vendors/i)).toBeInTheDocument();
    expect(screen.getByText(/messages/i)).toBeInTheDocument();

    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('navigates to shop', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    renderWithoutRouter(<RouterProvider router={router} />);
    fireEvent.click(screen.getByText(/shop/i));
    expect(screen.getByText(/Shop Page/i)).toBeInTheDocument();
  });

  test('navigates to signin', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    renderWithoutRouter(<RouterProvider router={router} />);
    fireEvent.click(screen.getByText(/log in/i));
    expect(screen.getByText(/Sign in Page/i)).toBeInTheDocument();
  });

  test('navigates to signup', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    renderWithoutRouter(<RouterProvider router={router} />);
    fireEvent.click(screen.getByText(/sign up/i));
    expect(screen.getByText(/Sign up Page/i)).toBeInTheDocument();
  });
});
