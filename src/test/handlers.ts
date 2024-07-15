import { http, HttpResponse } from 'msw';

import { RTKUrls } from 'src/common/constants';
import { apiUrl } from 'src/common/constants.ts';
import allProducts from 'src/test/mocks/allproducts';
import wishlistItems from 'src/test/mocks/wishlist';

import allVendors from './mocks/allvendors';
import cartItems from './mocks/cart';

const productId: string = allProducts[0].id;
const userId: string = '1';

const handlers = [
  http.get(`${apiUrl}${RTKUrls.PRODUCTS}`, () => {
    return HttpResponse.json(allProducts);
  }),
  http.get(`${apiUrl}${RTKUrls.BEST_VENDORS}`, () => {
    return HttpResponse.json(allVendors);
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
