import { Box } from '@mui/material';

import Footer from 'src/components/Footer';
import Header from 'src/components/Header';

import DescriptionSection from './DescriptionSection';
import ImagesSection from './ImagesSection';
import ProductSection from './ProductSection';

function ProductPage() {
  return (
    <Box width="100%">
      <Header />
      <Box padding="0 166px">
        <Box padding="52px 0" display="flex">
          <ImagesSection />
          <ProductSection />
        </Box>
      </Box>
      <DescriptionSection />
      <Footer />
    </Box>
  );
}

export default ProductPage;
