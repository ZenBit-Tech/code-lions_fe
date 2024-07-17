import { useTranslation } from 'react-i18next';

import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import CloseIcon from 'src/assets/icons/close.svg';
import DeleteIcon from 'src/assets/icons/delete-trash-red.svg';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useRejectProductMutation } from 'src/redux/adminProduct/adminProductService';

import {
  ModalTitle,
  ModalDescription,
  IconSmallWrapper,
  IconBigWrapper,
  Popup,
} from './styles';

interface IModalPopup {
  onClose: () => void;
  productId: string;
}

function ModalPopupReject({ onClose, productId }: IModalPopup) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const { handleOnSubmitError } = useErrorHandling();

  const [reject, { isLoading }] = useRejectProductMutation();

  const handleReject = async () => {
    try {
      await reject({ productId }).unwrap();
      onClose();
      showToast('success', t('productsAdmin.rejectSuccess'));
    } catch (err) {
      handleOnSubmitError(err, showToast, t('productsAdmin.rejectError'));
    }
  };

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
          <ModalTitle variant="h1">{t('productsAdmin.popupReject')}</ModalTitle>
          <ModalDescription>{t('productsAdmin.details')}</ModalDescription>
        </Box>
      </Box>
      <Box margin="0 88px" display="flex" gap="24px">
        <StyledButton
          onClick={onClose}
          width="200px"
          styles={StyleVariants.TRANSPARENT}
          padding={PaddingVariants.XL}
          disabled={isLoading}
        >
          <Typography variant="h4"> {t('vendorProductList.no')} </Typography>
        </StyledButton>
        <StyledButton
          width="200px"
          styles={StyleVariants.RED}
          padding={PaddingVariants.XL}
          onClick={handleReject}
          disabled={isLoading}
        >
          <Typography variant="h4">{t('vendorProductList.yes')} </Typography>
        </StyledButton>
      </Box>
    </Popup>
  );
}

export default ModalPopupReject;
