import {
  ImageList,
  ImageListItem,
  Box,
  Typography,
  IconButton,
} from '@mui/material';

import BlackHeartIcon from 'src/assets/icons/profile/heart-black.svg';
import theme from 'src/theme';

interface ImagesSectionProps {
  images: string[];
  vendorName: string;
}

function ImagesSection({ images, vendorName }: ImagesSectionProps) {
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
            sx={{
              border:
                item === images[0]
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
        <Box>
          <img
            src={images[0]}
            alt="Selected"
            style={{ width: '473px', height: '630px' }}
          />
        </Box>

        <IconButton
          sx={{
            position: 'absolute',
            top: 15,
            right: 15,
            padding: '3px',
            transition: 'all 0.3s ease',
            backgroundColor: theme.palette.common.white,
          }}
        >
          <BlackHeartIcon />
        </IconButton>

        <Box sx={{ margin: '30px 0' }}>
          <Typography sx={{ color: theme.palette.text.disabled }}>
            {vendorName}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ImagesSection;
