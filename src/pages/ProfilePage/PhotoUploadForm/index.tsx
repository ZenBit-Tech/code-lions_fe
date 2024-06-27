import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Avatar, IconButton } from '@mui/material';
import { Box } from '@mui/system';

import EditIcon from 'src/assets/icons/edit-white.svg';
import UserImageIcon from 'src/assets/icons/user-image.svg';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useAppSelector } from 'src/redux/hooks';
import { useUploadPhotoMutation } from 'src/redux/user/userService';
import { selectUser } from 'src/redux/user/userSlice';

import { AvatarBackdrop, AvatarPreview, VisuallyHiddenInput } from './styles';

function PhotoUploadForm() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const user = useAppSelector(selectUser);
  const [uploadPhoto] = useUploadPhotoMutation();
  const [preview, setPreview] = useState<string | null>(
    user.photoUrl ? import.meta.env.VITE_API_URL + user.photoUrl : null
  );
  const [imageError, setImageError] = useState(false);

  const { handleOnSubmitError } = useErrorHandling();

  const sendPhotoRequest = async (file: File | null) => {
    try {
      if (file instanceof File) {
        const formDataPhoto = new FormData();

        formDataPhoto.append('file', file);
        await uploadPhoto({ id: user.id, photo: formDataPhoto }).unwrap();
        showToast('success', t('profileDetails.successPhotoUpdate'));
      }
    } catch (err) {
      handleOnSubmitError(err, showToast, t('profileDetails.unknownError'));
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      const objectUrl = URL.createObjectURL(file);

      setPreview(objectUrl);
      await sendPhotoRequest(file);
      URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      {preview ? (
        <AvatarBackdrop>
          <AvatarPreview
            src={preview}
            sx={{ width: '120px', height: '120px' }}
            onError={() => setImageError(true)}
          />
          <AvatarBackdrop>
            <IconButton>
              <VisuallyHiddenInput
                type="file"
                accept="image/jpeg, image/png, image/heic"
                id="upload-photo"
                onChange={handleFileChange}
              />
              <EditIcon />
            </IconButton>
          </AvatarBackdrop>
        </AvatarBackdrop>
      ) : (
        <AvatarBackdrop>
          {imageError ? (
            <Avatar
              sx={{ width: '120px', height: '120px', position: 'absolute' }}
            >
              <UserImageIcon />
            </Avatar>
          ) : (
            <Avatar
              src={`${import.meta.env.VITE_API_URL}${user.photoUrl}`}
              sx={{ width: '120px', height: '120px', position: 'absolute' }}
              onError={() => setImageError(true)}
            />
          )}
          <IconButton>
            <VisuallyHiddenInput
              type="file"
              accept="image/jpeg, image/png, image/heic"
              id="upload-photo"
              onChange={handleFileChange}
            />
            <EditIcon />
          </IconButton>
        </AvatarBackdrop>
      )}
    </Box>
  );
}

export default PhotoUploadForm;
