import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import CloseIcon from 'src/assets/icons/close.svg';
import DeleteIcon from 'src/assets/icons/delete-trash-red.svg';
import { urls } from 'src/common/constants';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  IconBigWrapper,
  IconSmallWrapper,
  ModalDescription,
  ModalTitle,
  Popup,
} from 'src/pages/admin/UsersPage/ModalPopupUsers/styles';
import { useDeleteUserByAdminMutation } from 'src/redux/user/userService';
import { logout } from 'src/redux/user/userSlice';

interface IDeleteAccountPopup {
  onClose: () => void;
  userId: string | undefined;
}

function DeleteAccountPopup({ onClose, userId }: IDeleteAccountPopup) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [deleteUser] = useDeleteUserByAdminMutation();

  const { handleOnSubmitError } = useErrorHandling();

  async function handleDeleteUser(id?: string) {
    try {
      if (id) {
        await deleteUser({ userId: id }).unwrap();
        onClose();
        showToast('success', t('settings.deleteSuccess'));
        dispatch(logout());
        navigate(urls.HOME);

        return null;
      }
    } catch (error) {
      handleOnSubmitError(error, showToast, t('usersAdmin.deleteUserError'));
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
          <ModalTitle variant="h1">{t('settings.popupMessage')}</ModalTitle>
          <ModalDescription>{t('settings.popupDescription')}</ModalDescription>
        </Box>
      </Box>
      <Box margin="0 88px" display="flex" gap="24px">
        <StyledButton
          onClick={onClose}
          width="200px"
          styles={StyleVariants.TRANSPARENT}
          padding={PaddingVariants.XL}
        >
          <Typography variant="h4"> {t('settings.no')} </Typography>
        </StyledButton>
        <StyledButton
          width="200px"
          styles={StyleVariants.RED}
          padding={PaddingVariants.XL}
          onClick={() => handleDeleteUser(userId)}
        >
          <Typography variant="h4">{t('settings.yes')} </Typography>
        </StyledButton>
      </Box>
    </Popup>
  );
}

export default DeleteAccountPopup;
