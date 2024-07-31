import { IOrderProduct } from 'src/redux/order/types';

const getProductImageUrl = (product: IOrderProduct) => {
  const primaryImage = product.images.find((image) => image.isPrimary);

  return primaryImage ? primaryImage.url : '';
};

export default getProductImageUrl;
