import { renderHook, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from 'src/redux/store';
import cartItems from 'src/test/mocks/cart';

import { cartApi } from './cartService';

const userId: string = '1';

describe('cartApi', () => {
  const { useGetCartByIdQuery } = cartApi;

  it('fetches cart by user ID successfully', async () => {
    const { result } = renderHook(() => useGetCartByIdQuery({ userId }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.data).toEqual(cartItems));
  });
});
