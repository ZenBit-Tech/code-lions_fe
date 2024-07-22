import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

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
  setId,
  setPrimaryPhoto,
} from 'src/redux/addProduct/addProductSlice';
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

function ImageCard({ type, src, isPrimary }: ImageCardProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [uploadProductPhoto] = useUploadProductPhotoMutation();
  const [deleteProductPhoto] = useDeleteProductPhotoMutation();
  const [setProductPhotoPrimary] = useSetProductPhotoPrimaryMutation();
  const [pendingSrc, setPendingSrc] = useState<string | null | undefined>(null);

  const validateImage = (file: File): Promise<boolean> => {
    const validTypes = ['image/jpeg', 'image/png', 'image/heic'];

    if (!validTypes.includes(file.type)) {
      showToast('error', t('addProduct.invalidFileType'));

      return Promise.resolve(false);
    }
    if (file.size > maxMbImage * maxSizeImage * maxSizeImage) {
      showToast('error', t('addProduct.fileTooBig'));

      return Promise.resolve(false);
    }

    return new Promise((resolve) => {
      const img = new Image();

      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < maxWidthImage || img.height < maxHeightImage) {
          showToast('error', t('addProduct.fileTooSmall'));
          resolve(false);
        } else {
          resolve(true);
        }
      };
    });
  };

  const sendPhotoRequest = async (file: File | null) => {
    try {
      if (file instanceof File) {
        const formDataPhoto = new FormData();

        formDataPhoto.append('file', file);
        const response = await uploadProductPhoto({
          photo: formDataPhoto,
        }).unwrap();

        dispatch(setId(response.id));
        const newPhoto = response.images[response.images.length - 1];

        dispatch(addPhoto({ type: 'image', src: newPhoto, isPrimary: false }));
        if (pendingSrc) {
          await deleteProductPhoto({ url: pendingSrc }).unwrap();
          dispatch(removePhoto(pendingSrc));
        }
        setPendingSrc(null);
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
      } else {
        setPendingSrc(null);
      }
    }
  };

  const handleClick = () => {
    setPendingSrc(src);
    inputRef.current?.click();
  };

  const handleRemove = async () => {
    if (src) {
      try {
        dispatch(removePhoto(src));
        await deleteProductPhoto({ url: src }).unwrap();
      } catch (error) {
        showToast('error', t('addProduct.failedDelete'));
      }
    }
  };

  const handleSetPrimary = async () => {
    if (src) {
      try {
        await setProductPhotoPrimary({ url: src }).unwrap();
        dispatch(setPrimaryPhoto(src));
      } catch (error) {
        showToast('error', t('addProduct.failedSetPrimary'));
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0] || null;

    if (file) {
      const isValid = await validateImage(file);

      if (isValid) {
        await sendPhotoRequest(file);
      }
    }
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
      onDragOver={handleDragOver}
      onDrop={handleDrop}
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
            onClick={handleClick}
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
          onClick={handleClick}
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
