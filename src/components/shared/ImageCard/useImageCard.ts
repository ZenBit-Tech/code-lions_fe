import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  addPhoto,
  removePhoto,
  selectProductId,
  setId,
  setPrimaryPhoto,
} from 'src/redux/addProduct/addProductSlice';
import { useAppSelector } from 'src/redux/hooks';
import {
  useUploadProductPhotoMutation,
  useDeleteProductPhotoMutation,
  useSetProductPhotoPrimaryMutation,
} from 'src/redux/vendorProduct/vendorProductService';

const maxMbImage = 50;
const maxSizeImage = 1024;
const maxWidthImage = 1080;
const maxHeightImage = 1080;

const useImageCard = (_type: 'image' | 'video', src?: string) => {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [uploadProductPhoto] = useUploadProductPhotoMutation();
  const [deleteProductPhoto] = useDeleteProductPhotoMutation();
  const [setProductPhotoPrimary] = useSetProductPhotoPrimaryMutation();
  const [pendingSrc, setPendingSrc] = useState<string | null | undefined>(null);

  let productId = useAppSelector(selectProductId);

  if (!productId) {
    productId = 'new';
  }

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
          id: productId,
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
        try {
          await sendPhotoRequest(file);
        } catch (err) {
          if (err instanceof Error) {
            showToast('error', err.message);
          } else {
            showToast('error', t('onboarding.unknownError'));
          }
        }
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

  return {
    inputRef,
    handleUpload,
    handleClick,
    handleRemove,
    handleSetPrimary,
    handleDragOver,
    handleDrop,
    pendingSrc,
  };
};

export default useImageCard;
