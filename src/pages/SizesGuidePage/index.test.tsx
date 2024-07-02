import { screen } from '@testing-library/react';
import renderWithProviders from 'src/test/renderWithProviders';

import SizesGuidePage from './index';

test('renders Sizes Guide Page with data from table', async () => {
  renderWithProviders(<SizesGuidePage />);

  expect(screen.getByText('Clothes Size Table')).toBeInTheDocument();
  expect(screen.getByText('00000')).toBeInTheDocument();
});
