import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { useAppSelector } from 'src/redux/hooks';
import { selectUserId } from 'src/redux/user/userSlice';
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from 'src/redux/wishlist/wishlistService';
import theme from 'src/theme';

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
  const [selectedImage, setSelectedImage] = useState<string>(images[0]);
  const [open, setOpen] = useState<boolean>(false);
  const [initialSlideIndex, setInitialSlideIndex] = useState<number>(0);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  const userId = useSelector(selectUserId);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const wishlistData = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    if (wishlistData) {
      const isWishlistItem = wishlistData.some(
        (wishlistItem: { id: string }) => wishlistItem.id === productId
      );

      setIsInWishlist(isWishlistItem);
    }
  }, [wishlistData, productId]);

  const handleOpen = (index: number) => {
    setInitialSlideIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleImageClick = (src: string, index: number) => {
    setSelectedImage(src);
    setInitialSlideIndex(index);
  };

  const handleAddToWishlist = async () => {
    if (userId) {
      await addToWishlist({ userId, productId }).unwrap();
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (userId) {
      await removeFromWishlist({ userId, productId }).unwrap();
    }
  };

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
              opacity: '0.5',
              transition: 'all 0.3s ease',
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
