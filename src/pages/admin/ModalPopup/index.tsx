import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import CloseIcon from 'src/assets/icons/close.svg';
import DeleteIcon from 'src/assets/icons/delete-trash-red.svg';
import { urls } from 'src/common/constants';
import {
  getErrorMessage,
  isFetchBaseQueryError,
  isSerializedError,
} from 'src/common/hooks/useErrorHandling';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useDeleteUserByAdminMutation } from 'src/redux/user/userService';

import {
  ModalTitle,
  ModalDescription,
  IconSmallWrapper,
  IconBigWrapper,
  Popup,
} from './styles';

interface IModalPopup {
  onClose: () => void;
  userId: string | undefined;
}

function ModalPopup({ onClose, userId }: IModalPopup) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [deleteUserByAdmin] = useDeleteUserByAdminMutation();

  async function handleDeleteUser(id?: string) {
    try {
      if (id) {
        await deleteUserByAdmin({ userId: id }).unwrap();
        onClose();
        showToast('success', t('usersAdmin.deleteUserSuccess'));
        navigate(urls.ADMIN_USERS_FULL);

        return null;
      }
    } catch (error) {
      if (isFetchBaseQueryError(error) || isSerializedError(error)) {
        showToast(
          'error',
          getErrorMessage(error, t('usersAdmin.deleteUserError'))
        );
      } else {
        showToast('error', t('usersAdmin.deleteUserError'));
      }

      return error;
    }

    return null;
  }

  return (
    <Popup>
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="24px"
        justifyContent="center"
        alignItems="center"
      >
        <IconBigWrapper>
          <IconSmallWrapper>
            <DeleteIcon />
          </IconSmallWrapper>
        </IconBigWrapper>
        <Box
          display="flex"
          flexDirection="column"
          gap="12px"
          justifyContent="center"
          alignItems="center"
          width="428px"
        >
          <ModalTitle variant="h1">{t('modalPopup.title')}</ModalTitle>
          <ModalDescription>{t('modalPopup.description')}</ModalDescription>
        </Box>
      </Box>
      <Box margin="0 88px" display="flex" gap="24px">
        <StyledButton
          onClick={onClose}
          width="200px"
          styles={StyleVariants.TRANSPARENT}
          padding={PaddingVariants.XL}
        >
          <Typography variant="h4"> {t('modalPopup.cancelButton')} </Typography>
        </StyledButton>
        <StyledButton
          width="200px"
          styles={StyleVariants.RED}
          padding={PaddingVariants.XL}
          onClick={() => handleDeleteUser(userId)}
        >
          <Typography variant="h4">{t('modalPopup.deleteButton')} </Typography>
        </StyledButton>
      </Box>
    </Popup>
  );
}

export default ModalPopup;
