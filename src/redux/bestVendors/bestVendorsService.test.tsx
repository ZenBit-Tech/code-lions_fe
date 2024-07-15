import { renderHook, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from 'src/redux/store';
import allVendors from 'src/test/mocks/allvendors';

import { bestVendorsApi } from './bestVendorsService';

describe('bestVendorsApi', () => {
  const { useGetBestVendorsQuery } = bestVendorsApi;

  it('fetches best vendors successfully', async () => {
    const { result } = renderHook(() => useGetBestVendorsQuery(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.data).toEqual(allVendors));
  });
});
