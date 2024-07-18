import { useState } from 'react';

import { Box } from '@mui/material';

import theme from 'src/theme';

import ImageCard from '../ImageCard';

const maxMbImage = 50;
const maxSizeImage = 1024;
const maxWidthImage = 1600;
const maxHeightImage = 2400;
const maxNumberImage = 4;

const validateImage = (file: File): Promise<boolean> => {
  const validTypes = ['image/jpeg', 'image/png', 'image/heic'];

  if (!validTypes.includes(file.type)) {
    alert('Invalid file type. Only jpg, png, and heic are allowed.');

    return Promise.resolve(false);
  }
  if (file.size > maxMbImage * maxSizeImage * maxSizeImage) {
    alert('File is too large. Maximum size is 50 MB.');

    return Promise.resolve(false);
  }

  return new Promise((resolve) => {
    const img = new Image();

    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width < maxWidthImage || img.height < maxHeightImage) {
        alert('Image is too small. Minimum dimensions are 1600x2400 pixels.');
        resolve(false);
      } else {
        resolve(true);
      }
    };
  });
};

function ImagesForm() {
  const [mediaItems, setMediaItems] = useState<
    { id: number; type: 'image' | 'video'; src: string; isPrimary: boolean }[]
  >([]);

  const handleUpload = (file: File, id: number) => {
    validateImage(file).then((isValid) => {
      if (isValid) {
        const newSrc = URL.createObjectURL(file);

        setMediaItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, src: newSrc } : item
          )
        );
      }
    });
  };

  const handleRemove = (id: number) => {
    setMediaItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== id);

      if (
        updatedItems.length > 0 &&
        !updatedItems.some((item) => item.isPrimary)
      ) {
        updatedItems[0].isPrimary = true;
      }

      return updatedItems;
    });
  };

  const handlePrimary = (id: number) => {
    setMediaItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, isPrimary: true }
          : { ...item, isPrimary: false }
      )
    );
  };

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
            onUpload={(file) => handleUpload(file, item.id)}
            onRemove={() => handleRemove(item.id)}
            onPrimary={() => handlePrimary(item.id)}
          />
        ))}
        {mediaItems.filter((item) => item.type === 'image').length <
          maxNumberImage && (
          <ImageCard
            type="image"
            onUpload={(file) => {
              const newId = mediaItems.length
                ? Math.max(...mediaItems.map((item) => item.id)) + 1
                : 1;

              validateImage(file).then((isValid) => {
                if (isValid) {
                  const newSrc = URL.createObjectURL(file);

                  setMediaItems([
                    ...mediaItems,
                    {
                      id: newId,
                      type: 'image',
                      src: newSrc,
                      isPrimary: mediaItems.length === 0,
                    },
                  ]);
                }
              });
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default ImagesForm;
