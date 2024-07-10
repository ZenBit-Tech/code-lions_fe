import { Link } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';

import BagIcon from 'src/assets/icons/profile/bag-duotone.svg';
import BlackHeartIcon from 'src/assets/icons/profile/heart-black.svg';
import RedHeartIcon from 'src/assets/icons/profile/heart-red.svg';
import { urls } from 'src/common/constants';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import style from './styles';
import useProductCard from './useProductCard';

interface IProductCardProps {
  item: IProduct;
}

function ProductCard({ item }: IProductCardProps) {
  const {
    userId,
    isInWishlist,
    isInCart,
    handleAddToWishlist,
    handleRemoveFromWishlist,
    handleAddToCart,
    handleRemoveFromCart,
    handleCartClick,
    navigate,
  } = useProductCard(item);

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
              src={item.images[0]}
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
              <Link to={`${urls.PRODUCT_FEED}/${item.id}`}>{item.name}</Link>
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
                  ${item.price}
                </Typography>
                <Typography variant="subtitle2">
                  <Link
                    to={`${urls.VENDOR}/${item.vendor.id}`}
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                      event.stopPropagation()
                    }
                  >
                    {item.vendor.name}
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
                    onClick={userId ? handleAddToCart : handleCartClick}
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
