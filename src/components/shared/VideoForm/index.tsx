import { useState } from 'react';

import { Box } from '@mui/material';

import theme from 'src/theme';

import ImageCard from '../ImageCard';

const maxMbVideo = 100;
const maxSizeVideo = 1024;
const maxVideoNumber = 1;

const validateVideo = (file: File): boolean => {
  if (file.size > maxMbVideo * maxSizeVideo * maxSizeVideo) {
    alert('File is too large. Maximum size is 100 MB.');

    return false;
  }

  return true;
};

function VideoForm() {
  const [mediaItems, setMediaItems] = useState<
    { id: number; type: 'image' | 'video'; src: string; isPrimary: boolean }[]
  >([]);

  const handleUpload = (file: File, id: number) => {
    if (validateVideo(file)) {
      const newSrc = URL.createObjectURL(file);

      setMediaItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, src: newSrc } : item
        )
      );
    }
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
          marginBottom: '24px',
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
          />
        ))}
        {mediaItems.filter((item) => item.type === 'video').length <
          maxVideoNumber && (
          <ImageCard
            type="video"
            onUpload={(file) => {
              const newId = mediaItems.length
                ? Math.max(...mediaItems.map((item) => item.id)) + 1
                : 1;

              if (validateVideo(file)) {
                const newSrc = URL.createObjectURL(file);

                setMediaItems([
                  ...mediaItems,
                  {
                    id: newId,
                    type: 'video',
                    src: newSrc,
                    isPrimary: mediaItems.length === 0,
                  },
                ]);
              }
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default VideoForm;
