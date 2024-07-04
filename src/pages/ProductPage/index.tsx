import { useParams } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import { useGetProductByIdQuery } from 'src/redux/product/productService';

import DescriptionSection from './DescriptionSection';
import ImagesSection from './ImagesSection';
import ProductSection from './ProductSection';

function ProductPage() {
  const { productId } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(
    productId ? { productId } : skipToken
  );

  if (isLoading || !data) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress sx={{ color: 'black' }} />
      </Box>
    );
  }

  const { images, vendor, id } = data;

  return (
    <Box width="100%">
      <Header />
      <Box padding="0 166px">
        <Box padding="52px 0" display="flex">
          <ImagesSection
            images={images}
            vendorName={vendor.name}
            productId={id}
          />
          <ProductSection product={data} />
        </Box>
      </Box>
      <DescriptionSection product={data} />
      <Footer />
    </Box>
  );
}

export default ProductPage;
