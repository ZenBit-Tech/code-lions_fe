import { screen, fireEvent, waitFor } from '@testing-library/react';

import renderWithProviders from 'src/test/renderWithProviders';

import GeneralInformationForm from '.';

describe('GeneralInformationForm', () => {
  it('renders the form correctly', () => {
    renderWithProviders(<GeneralInformationForm />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    renderWithProviders(<GeneralInformationForm />);

    const nameInput = screen.getByPlaceholderText(
      'Enter your name'
    ) as HTMLInputElement | null;
    const emailInput = screen.getByPlaceholderText(
      'Enter your email'
    ) as HTMLInputElement | null;

    if (nameInput && emailInput) {
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, {
        target: { value: 'john.doe@example.com' },
      });

      await waitFor(() => {
        expect(screen.getByText('Save')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Save'));
    }
  });
});
