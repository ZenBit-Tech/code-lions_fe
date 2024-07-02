import { http, HttpResponse } from 'msw';
import { RTKUrls } from 'src/common/constants';
import { apiUrl } from 'src/common/constants.ts';
import allProducts from 'src/test/mocks/allproducts';

const handlers = [
  http.get(`${apiUrl}${RTKUrls.PRODUCTS}`, () => {
    return HttpResponse.json(allProducts);
  }),
];

export default handlers;
