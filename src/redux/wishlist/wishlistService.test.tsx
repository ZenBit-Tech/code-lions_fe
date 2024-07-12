import { renderHook, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';

import store from 'src/redux/store';
import wishlistItems from 'src/test/mocks/wishlist';

import { wishlistApi } from './wishlistService';

const userId: string = '1';

describe('wishlistApi', () => {
  const { useGetWishlistByIdQuery } = wishlistApi;

  it('fetches wishlist by user ID successfully', async () => {
    const { result } = renderHook(() => useGetWishlistByIdQuery({ userId }), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await waitFor(() => expect(result.current.data).toEqual(wishlistItems));
  });
});
