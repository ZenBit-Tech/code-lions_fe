import { http, HttpResponse } from 'msw';

import { RTKUrls } from 'src/common/constants';
import { apiUrl } from 'src/common/constants.ts';
import allProducts from 'src/test/mocks/allproducts';

export const unknownSearch = 'unknownSearch';
export const productsForSecondPage = 13;
const secondPage = '2';

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
    if (page === secondPage) {
      return HttpResponse.json({
        count: productsForSecondPage,
        products: allProducts,
      });
    }

    return HttpResponse.json({
      count: allProducts.length,
      products: allProducts,
    });
  }),
];

export default handlers;
