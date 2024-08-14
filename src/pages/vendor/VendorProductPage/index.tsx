import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Box, CircularProgress, Typography } from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query';
import { userRoles } from 'src/common/constants';
import StyledBackdrop from 'src/components/shared/StyledBackdrop';
import { useGetProductByIdQuery } from 'src/redux/product/productService';
import { selectUserRole } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import DescriptionSection from './DescriptionSection';
import ImagesSection from './ImagesSection';
import PreviewModePopup from './PreviewModePopup';
import ProductSection from './ProductSection';

function VendorProductPage() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const { data, isLoading } = useGetProductByIdQuery(
    productId ? { productId } : skipToken
  );

  const userRole = useSelector(selectUserRole);

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpen = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  if (isLoading) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress sx={{ color: theme.palette.common.black }} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Typography
          variant="h4"
          sx={{ mt: 4, fontSize: theme.typography.h5.fontSize }}
        >
          {t('product.productNotFound')}
        </Typography>
      </Box>
    );
  }

  const { images, vendor } = data;

  return (
    <>
      {showModal &&
        createPortal(
          <StyledBackdrop showModal={showModal}>
            <PreviewModePopup onClose={handleClose} />
          </StyledBackdrop>,
          document.body
        )}
      <Box
        width="100%"
        onClick={
          userRole === userRoles.VENDOR || userRole === userRoles.ADMIN
            ? handleOpen
            : undefined
        }
      >
        <Box padding="0 166px">
          <Box padding="52px 0" display="flex">
            <ImagesSection images={images} vendorName={vendor.name} />
            <ProductSection product={data} />
          </Box>
        </Box>
        <DescriptionSection product={data} />
      </Box>
    </>
  );
}

export default VendorProductPage;
