import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import { selectProductImages } from 'src/redux/addProduct/addProductSlice';
import { RootState } from 'src/redux/store';
import theme from 'src/theme';

import ImageCard from '../ImageCard';

const maxNumberImage = 4;

function ImagesForm() {
  const images = useSelector((state: RootState) => selectProductImages(state));

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        padding: '24px',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '5px',
        }}
      >
        {images.map(
          (item) =>
            (item.type === 'image' || item.type === 'video') && (
              <ImageCard
                key={item.src}
                type={item.type}
                src={item.src}
                isPrimary={item.isPrimary}
              />
            )
        )}
        {images.filter((item) => item.type === 'image').length <
          maxNumberImage && <ImageCard type="image" />}
      </Box>
    </Box>
  );
}

export default ImagesForm;
