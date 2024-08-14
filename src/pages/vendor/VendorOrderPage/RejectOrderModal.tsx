import { useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, IconButton, Typography } from '@mui/material';

import CloseIcon from 'src/assets/icons/close.svg';
import RedCrossIcon from 'src/assets/icons/vendor/red-cross.svg';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  IconBigWrapper,
  IconSmallWrapper,
  ModalTitle,
  Popup,
} from 'src/pages/vendor/VendorProductsPage/ModalPopup/styles';
import { useRejectOrderMutation } from 'src/redux/order/orderService';

import { TextArea } from './styles';

interface IRejectOrderModal {
  onClose: () => void;
  orderId: number;
}

const rows: number = 5;

function RejectOrderModal({ onClose, orderId }: IRejectOrderModal) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [rejectReason, setRejectReason] = useState<string>('');

  const [rejectOrder] = useRejectOrderMutation();

  const rejectOrderByVendor = async () => {
    if (!rejectReason.trim()) {
      showToast('error', t('toasterMessages.rejectReasonRequired'));

      return;
    }

    try {
      await rejectOrder({
        orderId,
        rejectReason,
      }).unwrap();

      onClose();
      setRejectReason('');
    } catch {
      showToast('error', t('toasterMessages.failedToRejectOrder'));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setRejectReason(e.target.value);
  };

  return (
    <Popup sx={{ width: '50%' }}>
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
            <RedCrossIcon />
          </IconSmallWrapper>
        </IconBigWrapper>
        <Box
          display="flex"
          flexDirection="column"
          gap="18px"
          justifyContent="center"
          alignItems="center"
          width="80%"
        >
          <ModalTitle variant="h1">{t('vendorOrder.modalTitle')}</ModalTitle>
          <TextArea
            minRows={rows}
            maxRows={rows}
            aria-label={t('vendorOrder.rejectLabel')}
            placeholder={t('vendorOrder.rejectPlaceholder')}
            value={rejectReason}
            onChange={handleInputChange}
          />
        </Box>
      </Box>
      <Box margin="0 5px" display="flex" justifyContent="center" gap="16px">
        <StyledButton
          width="30%"
          styles={StyleVariants.WHITE}
          padding={PaddingVariants.LG}
          onClick={onClose}
        >
          <Typography variant="h4">{t('vendorOrder.cancel')}</Typography>
        </StyledButton>
        <StyledButton
          width="30%"
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.LG}
          onClick={rejectOrderByVendor}
        >
          <Typography variant="h4">{t('vendorOrder.reject')}</Typography>
        </StyledButton>
      </Box>
    </Popup>
  );
}

export default RejectOrderModal;
