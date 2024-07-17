import { Link } from 'react-router-dom';

import {
  ImageList,
  ImageListItem,
  Box,
  Typography,
  IconButton,
} from '@mui/material';

import BlackHeartIcon from 'src/assets/icons/profile/heart-black.svg';
import RedHeartIcon from 'src/assets/icons/profile/heart-red.svg';
import { urls } from 'src/common/constants';
import ProductSliderModal from 'src/components/ProductSliderModal';
import theme from 'src/theme';

import useImagesSection from './hooks/useImageSection';

interface ImagesSectionProps {
  images: string[];
  vendorName: string;
  productId: string;
  vendorId: string;
}

function ImagesSection({
  images,
  vendorName,
  productId,
  vendorId,
}: ImagesSectionProps) {
  const {
    userId,
    selectedImage,
    open,
    initialSlideIndex,
    isInWishlist,
    handleOpen,
    handleClose,
    handleImageClick,
    handleAddToWishlist,
    handleRemoveFromWishlist,
  } = useImagesSection(productId, images);

  return (
    <Box width="570px" display="flex" marginRight="80px">
      <ImageList
        sx={{ width: 77, height: 450, marginRight: '20px' }}
        cols={1}
        rowHeight={102}
      >
        {images.map((item, index) => (
          <ImageListItem
            key={index}
            onClick={() => handleImageClick(item, index)}
            sx={{
              border:
                item === selectedImage
                  ? `1px solid ${theme.palette.common.black}`
                  : 'none',
              cursor: 'pointer',
            }}
          >
            <img
              srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item}?w=164&h=164&fit=crop&auto=format`}
              alt={`product${index}`}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box mb={2} position="relative">
        <ProductSliderModal
          open={open}
          handleClose={handleClose}
          images={images}
          initialSlideIndex={initialSlideIndex}
        />
        <Box onClick={() => handleOpen(initialSlideIndex)}>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: '473px', height: '630px' }}
          />
        </Box>
        {userId && (
          <IconButton
            sx={{
              position: 'absolute',
              top: 15,
              right: 15,
              padding: '3px',
              transition: 'all 0.3s ease',
              backgroundColor: theme.palette.common.white,
            }}
            onClick={
              isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
            }
          >
            {isInWishlist ? <RedHeartIcon /> : <BlackHeartIcon />}
          </IconButton>
        )}
        <Box sx={{ margin: '30px 0' }}>
          <Link to={`${urls.VENDOR}/${vendorId}`}>
            <Typography sx={{ color: theme.palette.text.disabled }}>
              {vendorName}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default ImagesSection;
