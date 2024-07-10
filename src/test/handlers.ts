import { http, HttpResponse } from 'msw';

import { RTKUrls } from 'src/common/constants';
import { apiUrl } from 'src/common/constants.ts';
import allProducts from 'src/test/mocks/allproducts';

import allVendors from './mocks/allvendors';

const handlers = [
  http.get(`${apiUrl}${RTKUrls.PRODUCTS}`, () => {
    return HttpResponse.json(allProducts);
  }),
  http.get(`${apiUrl}${RTKUrls.BEST_VENDORS}`, () => {
    return HttpResponse.json(allVendors);
  }),
];

export default handlers;
