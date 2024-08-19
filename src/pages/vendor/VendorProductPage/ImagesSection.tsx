import { Link } from 'react-router-dom';

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
        <Box sx={{ flex: 1, maxHeight: '600px' }}>
          <Box
            sx={{
              position: 'relative',
              height: '600px',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: theme.palette.grey[100],
            }}
          >
            <img
              src={images[0]}
              alt="Selected"
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
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
        </Box>
      </Box>

      <Box sx={{ margin: '30px 120px' }}>
        <Link to=".">
          <Typography sx={{ color: theme.palette.text.disabled }}>
            {vendorName}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default ImagesSection;
