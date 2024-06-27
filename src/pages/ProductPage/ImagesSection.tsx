import { useState } from 'react';

import { ImageList, ImageListItem, Box } from '@mui/material';

import theme from 'src/theme';

import itemData from './mockData';

function ImagesSection() {
  const [selectedImage, setSelectedImage] = useState(itemData[0].img);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  return (
    <Box width="570px" display="flex" marginRight="80px">
      <ImageList
        sx={{ width: 77, height: 450, marginRight: '20px' }}
        cols={1}
        rowHeight={102}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.id}
            onClick={() => handleImageClick(item.img)}
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
      <Box mb={2}>
        <img
          src={selectedImage}
          alt="Selected"
          style={{ width: '473px', height: '630px' }}
        />
      </Box>
    </Box>
  );
}

export default ImagesSection;
