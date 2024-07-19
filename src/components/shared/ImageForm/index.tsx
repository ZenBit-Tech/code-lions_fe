import { useState } from 'react';

import { Box } from '@mui/material';

import theme from 'src/theme';

import ImageCard from '../ImageCard';

const maxNumberImage = 4;

function ImagesForm() {
  const [mediaItems] = useState<
    { id: number; type: 'image' | 'video'; src: string; isPrimary: boolean }[]
  >([]);

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
        {mediaItems.map((item) => (
          <ImageCard
            key={item.id}
            type={item.type}
            src={item.src}
            isPrimary={item.isPrimary}
          />
        ))}
        {mediaItems.filter((item) => item.type === 'image').length <
          maxNumberImage && <ImageCard type="image" />}
      </Box>
    </Box>
  );
}

export default ImagesForm;
