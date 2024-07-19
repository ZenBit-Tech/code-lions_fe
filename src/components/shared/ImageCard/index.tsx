import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, IconButton, Typography, Button } from '@mui/material';
import { alpha } from '@mui/system';

import Pen from 'src/assets/icons/addProduct/pen.svg';
import Primary from 'src/assets/icons/addProduct/primary.svg';
import PrimaryTrue from 'src/assets/icons/addProduct/primaryTrue.svg';
import Trash from 'src/assets/icons/addProduct/trash.svg';
import Add from 'src/assets/icons/addProduct/upload.svg';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useUploadProductPhotoMutation,
  useDeleteProductPhotoMutation,
  useSetProductPhotoPrimaryMutation,
} from 'src/redux/addProduct/addProductService';
import {
  addPhoto,
  removePhoto,
  setPrimaryPhoto,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';
import theme from 'src/theme';

const transparency = 0.6;
const maxMbImage = 50;
const maxSizeImage = 1024;
const maxWidthImage = 1080;
const maxHeightImage = 1080;

interface ImageCardProps {
  type: 'image' | 'video';
  src?: string;
  isPrimary?: boolean;
}

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
        alert('Image is too small. Minimum dimensions are 1080x1080 pixels.');
        resolve(false);
      } else {
        resolve(true);
      }
    };
  });
};

function ImageCard({ type, src, isPrimary }: ImageCardProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const dispatch = useAppDispatch();

  const [uploadProductPhoto] = useUploadProductPhotoMutation();
  const [deleteProductPhoto] = useDeleteProductPhotoMutation();
  const [setProductPhotoPrimary] = useSetProductPhotoPrimaryMutation();

  const sendPhotoRequest = async (file: File | null) => {
    console.log('111');
    try {
      if (file instanceof File) {
        const formDataPhoto = new FormData();

        formDataPhoto.append('file', file);
        console.log('222');
        const response = await uploadProductPhoto({
          photo: formDataPhoto,
        }).unwrap();

        console.log(response);
        const newPhoto = response.images[0];

        console.log(newPhoto);
        dispatch(addPhoto(newPhoto));
      }
    } catch (err) {
      if (err instanceof Error) {
        showToast('error', err.message);
      } else {
        showToast('error', t('onboarding.unknownError'));
      }
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const isValid = await validateImage(file);

      if (isValid) {
        await sendPhotoRequest(file);
      }
    }
  };

  const handleRemove = async () => {
    if (src) {
      try {
        const formData = new FormData();

        formData.append('photo', src);
        await deleteProductPhoto({ photo: formData }).unwrap();
        dispatch(removePhoto(src));
      } catch (error) {
        console.error('Failed to delete photo: ', error);
      }
    }
  };

  const handleSetPrimary = async () => {
    if (src) {
      try {
        const formData = new FormData();

        formData.append('photo', src);
        await setProductPhotoPrimary({ photo: formData }).unwrap();
        dispatch(setPrimaryPhoto(src));
      } catch (error) {
        console.error('Failed to set primary photo: ', error);
      }
    }
  };

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '160px',
        height: '160px',
        borderRadius: '4px',
        overflow: 'hidden',
        border: src ? 'none' : 'dashed gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: src
          ? 'transparent'
          : alpha(theme.palette.primary.light, transparency),
      }}
    >
      <input
        type="file"
        accept={
          type === 'image' ? 'image/jpeg,image/png,image/heic' : 'video/*'
        }
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={handleUpload}
      />
      {src ? (
        <>
          <IconButton
            sx={{
              position: 'absolute',
              top: '0px',
              right: '129px',
            }}
            onClick={handleSetPrimary}
          >
            {isPrimary ? <PrimaryTrue /> : <Primary />}
          </IconButton>
          {isPrimary && (
            <Typography
              sx={{
                lineHeight: '1.1',
                position: 'absolute',
                top: '6px',
                left: '27px',
                padding: '2px 4px',
                fontSize: '12px',
              }}
            >
              {t('addProduct.primary')}
            </Typography>
          )}
          <IconButton
            sx={{
              position: 'absolute',
              top: '0px',
              right: '25px',
            }}
            onClick={triggerUpload}
          >
            <Pen />
          </IconButton>
          {type === 'image' ? (
            <img
              src={src}
              alt="Uploaded"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <video src={src} style={{ width: '100%', height: '100%' }} controls>
              <track kind="captions" />
            </video>
          )}
          <IconButton
            sx={{
              position: 'absolute',
              top: '0px',
              right: '1px',
            }}
            onClick={handleRemove}
          >
            <Trash />
          </IconButton>
        </>
      ) : (
        <Button
          onClick={triggerUpload}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textTransform: 'none',
            p: 0,
            m: 0,
            border: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Add />
          <Typography
            variant="h4"
            sx={{
              bgcolor: theme.palette.common.black,
              borderRadius: '4px',
              color: theme.palette.common.white,
              padding: '8px 24px',
              margin: '8px 0px',
              ...theme.typography.h4,
            }}
          >
            Add {type === 'image' ? 'Image' : 'Video'}
          </Typography>
          <Typography color="textSecondary">
            {type === 'image'
              ? t('addProduct.dropImage')
              : t('addProduct.dropVideo')}
          </Typography>
        </Button>
      )}
    </Box>
  );
}

export default ImageCard;
