import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';

import { skipToken } from '@reduxjs/toolkit/query';
import BagIcon from 'src/assets/icons/profile/bag-duotone.svg';
import BlackHeartIcon from 'src/assets/icons/profile/heart-black.svg';
import RedHeartIcon from 'src/assets/icons/profile/heart-red.svg';
import { urls } from 'src/common/constants';
import ProductSliderModal from 'src/components/ProductSliderModal';
import { IProduct } from 'src/redux/product/types';
import { selectUserId } from 'src/redux/user/userSlice';
import {
  useAddToWishlistMutation,
  useGetWishlistByIdQuery,
  useRemoveFromWishlistMutation,
} from 'src/redux/wishlist/wishlistService';
import theme from 'src/theme';

import style from './styles';

interface IProductCardProps {
  item: IProduct;
}

const initialSlideIndex: number = 0;

function ProductCard({ item }: IProductCardProps) {
  const { images, name, vendor, price } = item;

  const userId = useSelector(selectUserId);
  const [open, setOpen] = useState<boolean>(false);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const { data: wishlistData } = useGetWishlistByIdQuery(
    userId ? { userId } : skipToken
  );

  useEffect(() => {
    if (wishlistData) {
      const isWishlistItem = wishlistData.some(
        (wishlistItem: { id: string }) => wishlistItem.id === item.id
      );

      setIsInWishlist(isWishlistItem);
    }
  }, [wishlistData, item.id]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddToWishlist = async () => {
    if (userId) {
      await addToWishlist({ userId, productId: item.id }).unwrap();
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (userId) {
      await removeFromWishlist({ userId, productId: item.id }).unwrap();
    }
  };

  return (
    <>
      <ProductSliderModal
        open={open}
        handleClose={handleClose}
        images={images}
        initialSlideIndex={initialSlideIndex}
      />
      <Box sx={style.card}>
        <Box sx={style.cardWrapper}>
          <Box sx={style.imgContainer}>
            <Box sx={style.imgLink}>
              <Box
                component="img"
                src={images[0]}
                alt="product"
                sx={style.imgWrapper}
                onClick={handleOpen}
              />
            </Box>
          </Box>
          {userId && (
            <>
              {isInWishlist ? (
                <IconButton
                  sx={style.heartIcon}
                  onClick={handleRemoveFromWishlist}
                >
                  <RedHeartIcon />
                </IconButton>
              ) : (
                <IconButton sx={style.heartIcon} onClick={handleAddToWishlist}>
                  <BlackHeartIcon />
                </IconButton>
              )}
            </>
          )}
          <Box sx={style.productInfoWrapper}>
            <Box width="100%">
              <Typography
                variant="button"
                component="h3"
                sx={{
                  lineHeight: '28px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                  textOverflow: 'ellipsis',
                }}
              >
                <Link to={`${urls.PRODUCT_FEED}/${item.id}`}>{name}</Link>
              </Typography>
              <Box sx={style.productInfo}>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      color: theme.palette.text.disabled,
                      lineHeight: '22px',
                    }}
                  >
                    ${price}
                  </Typography>
                  <Typography variant="subtitle2">
                    <Link to={`${urls.VENDOR}/${vendor.id}`}>
                      {vendor.name}
                    </Link>
                  </Typography>
                </Box>
                <Box sx={style.bagIconWrapper}>
                  <IconButton
                    sx={{ backgroundColor: theme.palette.common.black }}
                    onClick={handleAddToWishlist}
                  >
                    <BagIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductCard;
