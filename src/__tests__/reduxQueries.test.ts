import { waitFor } from '@testing-library/dom';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { RTKUrls } from 'common/constants';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { IPublicUser, IReview } from '../redux/user/types';
import { userApi } from '../redux/user/userService';

import ReduxProvider from './reduxProvider';

jest.mock('../config/config', () => ({
  config: {
    apiUrl: 'http://localhost:3000:mock',
  },
}));

const userUrl = `${RTKUrls.USERS}/:id`;
const userReviewsUrl = `${RTKUrls.USER_REVIEWS}/:id`;

const server = setupServer(
  rest.get(userUrl, (req, res, ctx) => {
    return res(
      ctx.json({
        id: req.params.id as string,
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'buyer',
        isEmailVerified: true,
        photoUrl: 'photo_url',
        phoneNumber: '1234567890',
        addressLine1: '123 Street',
        addressLine2: 'Apt 4B',
        country: 'USA',
        state: 'CA',
        city: 'Los Angeles',
        clothesSize: 'M',
        jeansSize: '32',
        shoesSize: '10',
        isAccountActive: true,
        rating: 4.5,
        orders: 10,
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
        deletedAt: new Date(),
        onboardingStep: 3,
      } as IPublicUser)
    );
  }),
  rest.get(userReviewsUrl, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '1',
          text: 'Great user!',
          rating: 5,
          userId: req.params.id as string,
          reviewerId: '2',
          reviewerName: 'Jane Doe',
          reviewerAvatar: 'avatar_url',
          createdAt: new Date().toISOString(),
        },
      ] as IReview[])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Redux API Queries', () => {
  it('should fetch public user by id', async () => {
    const { result } = await act(async () =>
      renderHook(() => userApi.endpoints.getPublicUserById.useQuery('1'), {
        wrapper: ReduxProvider,
      })
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'buyer',
      isEmailVerified: true,
      photoUrl: 'photo_url',
      phoneNumber: '1234567890',
      addressLine1: '123 Street',
      addressLine2: 'Apt 4B',
      country: 'USA',
      state: 'CA',
      city: 'Los Angeles',
      clothesSize: 'M',
      jeansSize: '32',
      shoesSize: '10',
      isAccountActive: true,
      rating: 4.5,
      orders: 10,
      createdAt: expect.any(Date),
      lastUpdatedAt: expect.any(Date),
      deletedAt: expect.any(Date),
      onboardingStep: 3,
    });
  });

  it('should fetch user reviews', async () => {
    const { result } = await act(async () =>
      renderHook(() => userApi.endpoints.getUserReviews.useQuery('1'), {
        wrapper: ReduxProvider,
      })
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([
      {
        id: '1',
        text: 'Great user!',
        rating: 5,
        userId: '1',
        reviewerId: '2',
        reviewerName: 'Jane Doe',
        reviewerAvatar: 'avatar_url',
        createdAt: expect.any(String),
      },
    ]);
  });
});
