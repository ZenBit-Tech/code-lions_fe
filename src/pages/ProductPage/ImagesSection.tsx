import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ImageList,
  ImageListItem,
  Box,
  Typography,
  IconButton,
} from '@mui/material';

import LikeIcon from 'src/assets/icons/profile/heart-outlined.svg';
import ProductSliderModal from 'src/components/ProductSliderModal';
import theme from 'src/theme';

import itemData from './mockData';

const sliderImages: string[] = itemData.map((item) => item.img);

function ImagesSection() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<string>(itemData[0].img);
  const [open, setOpen] = useState<boolean>(false);
  const [initialSlideIndex, setInitialSlideIndex] = useState<number>(0);

  const handleOpen = (index: number) => {
    setInitialSlideIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleImageClick = (src: string, index: number) => {
    setSelectedImage(src);
    setInitialSlideIndex(index);
  };

  return (
    <Box width="570px" display="flex" marginRight="80px">
      <ImageList
        sx={{ width: 77, height: 450, marginRight: '20px' }}
        cols={1}
        rowHeight={102}
      >
        {itemData.map((item, index) => (
          <ImageListItem
            key={item.id}
            onClick={() => handleImageClick(item.img, index)}
            sx={{
              border:
                item.img === selectedImage
                  ? `1px solid ${theme.palette.common.black}`
                  : 'none',
              cursor: 'pointer',
            }}
          >
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box mb={2} position="relative">
        <ProductSliderModal
          open={open}
          handleClose={handleClose}
          images={sliderImages}
          initialSlideIndex={initialSlideIndex}
        />
        <Box onClick={() => handleOpen(initialSlideIndex)}>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: '473px', height: '630px' }}
          />
        </Box>
        <IconButton
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
          }}
        >
          <LikeIcon />
        </IconButton>
        <Box sx={{ margin: '30px 0' }}>
          <Typography sx={{ color: theme.palette.text.disabled }}>
            {t('product.vendorName')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ImagesSection;
