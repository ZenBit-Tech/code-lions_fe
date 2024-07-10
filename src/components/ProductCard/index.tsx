import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';

import BagIcon from 'src/assets/icons/profile/bag-duotone.svg';
import BlackHeartIcon from 'src/assets/icons/profile/heart-black.svg';
import RedHeartIcon from 'src/assets/icons/profile/heart-red.svg';
import { urls } from 'src/common/constants';
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from 'src/redux/cart/cartService';
import { useAppSelector } from 'src/redux/hooks';
import { IProduct } from 'src/redux/product/types';
import { selectUserId } from 'src/redux/user/userSlice';
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from 'src/redux/wishlist/wishlistService';
import theme from 'src/theme';

import style from './styles';

interface IProductCardProps {
  item: IProduct;
}

const duration: number = 7;

function ProductCard({ item }: IProductCardProps) {
  const { images, name, vendor, price } = item;

  const userId = useSelector(selectUserId);

  const navigate = useNavigate();

  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const [isInCart, setIsInCart] = useState<boolean>(false);

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const wishlistData = useAppSelector((state) => state.wishlist);

  const cartData = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (wishlistData) {
      const isWishlistItem = wishlistData.some(
        (wishlistItem: { id: string }) => wishlistItem.id === item.id
      );

      setIsInWishlist(isWishlistItem);
    }
  }, [wishlistData, item.id]);

  useEffect(() => {
    if (cartData) {
      const isCartItem = cartData.some(
        (cartItem: { productId: string }) => cartItem.productId === item.id
      );

      setIsInCart(isCartItem);
    }
  }, [cartData, item.id]);

  const handleAddToWishlist = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (userId) {
      await addToWishlist({ userId, productId: item.id }).unwrap();
      setIsInWishlist(true);
    }
  };

  const handleRemoveFromWishlist = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (userId) {
      await removeFromWishlist({ userId, productId: item.id }).unwrap();
      setIsInWishlist(false);
    }
  };

  const handleAddToCart = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (userId) {
      await addToCart({ userId, productId: item.id, duration, price }).unwrap();
      setIsInCart(true);
    }
  };

  const handleRemoveFromCart = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    if (userId) {
      await removeFromCart({ userId, productId: item.id }).unwrap();
      setIsInCart(false);
    }
  };

  return (
    <Box
      sx={style.card}
      onClick={() => navigate(`${urls.PRODUCT_FEED}/${item.id}`)}
    >
      <Box sx={style.cardWrapper}>
        <Box sx={style.imgContainer}>
          <Box sx={style.imgLink}>
            <Box
              component="img"
              src={images[0]}
              alt="product"
              sx={style.imgWrapper}
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
                  <Link
                    to={`${urls.VENDOR}/${vendor.id}`}
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                      event.stopPropagation()
                    }
                  >
                    {vendor.name}
                  </Link>
                </Typography>
              </Box>
              <Box sx={style.bagIconWrapper}>
                {isInCart ? (
                  <IconButton
                    sx={{
                      backgroundColor: theme.palette.common.black,
                      opacity: 0.3,
                      '&:hover': {
                        backgroundColor: theme.palette.common.black,
                        opacity: 0.3,
                      },
                    }}
                    onClick={handleRemoveFromCart}
                  >
                    <BagIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{
                      backgroundColor: theme.palette.common.black,
                      '&:hover': {
                        backgroundColor: theme.palette.common.black,
                      },
                    }}
                    onClick={handleAddToCart}
                  >
                    <BagIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductCard;
