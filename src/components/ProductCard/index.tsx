import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, IconButton, Typography } from '@mui/material';

import BagIcon from 'src/assets/icons/profile/bag-duotone.svg';
import BlackHeartIcon from 'src/assets/icons/profile/heart-black.svg';
import { urls } from 'src/common/constants';
import ProductSliderModal from 'src/components/ProductSliderModal';
import { IProduct } from 'src/redux/product/types';
import theme from 'src/theme';

import style from './styles';

interface IProductCardProps {
  item: IProduct;
}

const initialSlideIndex: number = 0;

function ProductCard({ item }: IProductCardProps) {
  const { images, name, vendor, price } = item;

  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <IconButton sx={style.heartIcon}>
            <BlackHeartIcon />
          </IconButton>
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
                <Link to={`${urls.PRODUCT}/${item.slug}`}>{name}</Link>
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
