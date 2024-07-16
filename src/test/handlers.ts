import { http, HttpResponse } from 'msw';

import { RTKUrls } from 'src/common/constants';
import { apiUrl } from 'src/common/constants.ts';
import allProducts from 'src/test/mocks/allProducts';
import wishlistItems from 'src/test/mocks/wishlist';

import cartItems from './mocks/cart';

const productId: string = allProducts[0].id;
const userId: string = '1';

export const unknownSearch = 'unknownSearch';
export const productsForTheRequestedPage = 13;
const pageRequestedFromTheTest = '2';

const handlers = [
  http.get(`${apiUrl}${RTKUrls.PRODUCTS}`, ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get('search');
    const page = url.searchParams.get('page');

    if (searchTerm === unknownSearch) {
      return HttpResponse.json({
        count: 0,
        products: [],
      });
    }
    if (page === pageRequestedFromTheTest) {
      return HttpResponse.json({
        count: productsForTheRequestedPage,
        products: allProducts,
      });
    }

    return HttpResponse.json({
      count: allProducts.length,
      products: allProducts,
    });
  }),
  http.get(`${RTKUrls.PRODUCTS}/item/${productId}`, () => {
    return HttpResponse.json(allProducts[0]);
  }),
  http.get(`${RTKUrls.WISHLIST}/${userId}`, () => {
    return HttpResponse.json(wishlistItems);
  }),
  http.get(`${RTKUrls.CART}/${userId}`, () => {
    return HttpResponse.json(cartItems);
  }),
];

export default handlers;
