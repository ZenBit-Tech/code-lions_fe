import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Avatar, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import EditIcon from 'src/assets/icons/edit-white.svg';
import UserImageIcon from 'src/assets/icons/user-image.svg';
import { apiUrl } from 'src/common/constants.ts';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useAppSelector } from 'src/redux/hooks';
import { useUploadPhotoMutation } from 'src/redux/user/userService';
import { selectUser } from 'src/redux/user/userSlice';
import theme from 'src/theme';

import { AvatarBackdrop, AvatarPreview, VisuallyHiddenInput } from './styles';

function AvatarUploader() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const user = useAppSelector(selectUser);
  const [uploadPhoto] = useUploadPhotoMutation();
  const [preview, setPreview] = useState<string | null>(
    user.photoUrl ? apiUrl + user.photoUrl : null
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: '96px',
      }}
    >
      <Box width="150px" display="flex" flexDirection="column" gap="8px">
        <Typography
          variant="button"
          component="p"
          sx={{ fontWeight: theme.typography.bold }}
        >
          {t('vendorPersonalInfo.avatar')}
        </Typography>
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ color: theme.palette.text.disabled }}
        >
          {t('vendorPersonalInfo.avatarRequirements')}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        {preview ? (
          <AvatarBackdrop>
            <AvatarPreview
              src={preview}
              sx={{ width: '105px', height: '105px' }}
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
                sx={{ width: '105px', height: '105px', position: 'absolute' }}
              >
                <UserImageIcon />
              </Avatar>
            ) : (
              <Avatar
                src={`${apiUrl}${user.photoUrl}`}
                sx={{ width: '105px', height: '105px', position: 'absolute' }}
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
    </Box>
  );
}

export default AvatarUploader;
