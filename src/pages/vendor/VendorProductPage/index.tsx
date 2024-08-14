import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, CircularProgress, IconButton, Typography } from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query';
import GoBackArrow from 'src/assets/icons/arrow-left.svg';
import DeleteIcon from 'src/assets/icons/delete-trash.svg';
import EditIcon from 'src/assets/icons/edit-pencil.svg';
import { linkUrls, urls, userRoles } from 'src/common/constants';
import StyledBackdrop from 'src/components/shared/StyledBackdrop';
import { setPending } from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';
import { useGetProductByIdQuery } from 'src/redux/product/productService';
import { selectUserRole } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import ModalPopup from '../VendorProductsPage/ModalPopup';

import DescriptionSection from './DescriptionSection';
import ImagesSection from './ImagesSection';
import PreviewModePopup from './PreviewModePopup';
import ProductSection from './ProductSection';

function VendorProductPage() {
  const { t } = useTranslation();
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetProductByIdQuery(
    productId ? { productId } : skipToken
  );

  const userRole = useSelector(selectUserRole);

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleDeleteModalOpen = () => {
    setShowDeleteModal(true);
  };
  const handleDeleteModalClose = () => setShowDeleteModal(false);

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
      {showDeleteModal &&
        createPortal(
          <StyledBackdrop showModal={showDeleteModal}>
            <ModalPopup
              onClose={handleDeleteModalClose}
              productId={productId ?? ''}
            />
          </StyledBackdrop>,
          document.body
        )}
      <Box sx={{ padding: '0 166px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px 0',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            <IconButton
              onClick={() => navigate(urls.VENDOR_GLOBAL_PRODUCTS)}
              sx={{ padding: 0 }}
            >
              <GoBackArrow />
            </IconButton>
            <Typography
              variant="button"
              sx={{
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 2.31,
              }}
            >
              {t('vendorPublicProductPage.productList')}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            {userRole === userRoles.ADMIN ? null : (
              <IconButton
                sx={{ padding: 0 }}
                onClick={() => {
                  navigate(`/${linkUrls.VENDOR_EDIT_PRODUCT}/${productId}`);
                  dispatch(setPending(false));
                }}
              >
                <EditIcon />
              </IconButton>
            )}
            <IconButton sx={{ padding: 0 }} onClick={handleDeleteModalOpen}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
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
