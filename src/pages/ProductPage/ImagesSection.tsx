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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        marginRight: '80px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          gap: '20px',
          maxHeight: '600px',
          alignItems: 'center',
        }}
      >
        <ImageList
          sx={{
            display: 'flex',
            padding: '1px',
            flexDirection: 'column',
            maxHeight: '600px',
            gap: '20px !important',
            width: '100px',
          }}
        >
          {images.map((item, index) => (
            <ImageListItem
              key={index}
              onClick={() => handleImageClick(item, index)}
              sx={{
                outline:
                  item === selectedImage
                    ? `1px solid ${theme.palette.common.black}`
                    : 'none',
                cursor: 'pointer',
              }}
            >
              <img src={item} alt={`product${index}`} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
        <Box sx={{ flex: 1, maxHeight: '600px' }}>
          <ProductSliderModal
            open={open}
            handleClose={handleClose}
            images={images}
            initialSlideIndex={initialSlideIndex}
          />
          <Box
            sx={{
              position: 'relative',
              height: '600px',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: theme.palette.grey[100],
            }}
            onClick={() => handleOpen(initialSlideIndex)}
          >
            <img
              src={selectedImage}
              alt="Selected"
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
            {userId && (
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 15,
                  right: 25,
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
          </Box>
        </Box>
      </Box>
      <Box sx={{ margin: '30px 120px' }}>
        <Link to={`${urls.VENDOR}/${vendorId}`}>
          <Typography sx={{ color: theme.palette.text.disabled }}>
            {vendorName}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default ImagesSection;
