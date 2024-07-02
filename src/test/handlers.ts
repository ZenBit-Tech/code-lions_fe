import { http, HttpResponse } from 'msw';
import { RTKUrls } from 'src/common/constants';
import allProducts from 'src/test/mocks/allproducts';

const apiUrl = import.meta.env.VITE_API_URL;

const handlers = [
  http.get(`${apiUrl}${RTKUrls.PRODUCTS}`, () => {
    return HttpResponse.json(allProducts);
  }),
];

export default handlers;
