import { useState } from 'react';

import { Box, IconButton, Typography } from '@mui/material';

import BagIcon from 'src/assets/icons/profile/bag-duotone.svg';
import BlackHeartIcon from 'src/assets/icons/profile/heart-black.svg';
import ProductSliderModal from 'src/components/ProductSliderModal';
import theme from 'src/theme';

import style from './styles';

interface IProductCardProps {
  item: {
    id: number;
    images: string[];
    productName: string;
    price: string;
    vendorName: string;
  };
}

const initialSlideIndex: number = 0;

function ProductCard({ item }: IProductCardProps) {
  const { images, productName, vendorName, price } = item;

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
      <Box sx={style.cardWrapper}>
        <Box
          component="img"
          src={images[0]}
          alt="product"
          sx={style.imgWrapper}
          onClick={handleOpen}
        />
        <IconButton sx={style.heartIcon}>
          <BlackHeartIcon />
        </IconButton>
        <Box sx={style.productInfoWrapper}>
          <Box width="70%">
            <Typography variant="button" sx={{ lineHeight: '28px' }}>
              {productName}
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: theme.palette.text.disabled, lineHeight: '22px' }}
            >
              {price}
            </Typography>
            <Typography variant="subtitle2">{vendorName}</Typography>
          </Box>
          <Box sx={style.bagIconWrapper}>
            <IconButton sx={{ backgroundColor: theme.palette.common.black }}>
              <BagIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductCard;
