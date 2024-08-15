import { MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import SuccessIcon from 'src/assets/icons/addProduct/success-icon.svg';
import CloseIcon from 'src/assets/icons/close.svg';
import { urls } from 'src/common/constants';
import StyledButton from 'src/components/shared/StyledButton';
import { StyleVariants } from 'src/components/shared/StyledButton/types';
import {
  resetAddProduct,
  setPending,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';

import {
  Backdrop,
  Modal,
  ModalSubtitle,
  ModalTitle,
  StyledCloseBtn,
} from './styles';

interface IVerificationModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

const modalRoot = document.querySelector('#modal-root');
const escapeBtn: string = 'Escape';
const hiddenOverflow: string = 'hidden';
const autoOverflow: string = 'auto';

function VerificationModal({ isModalOpen, onClose }: IVerificationModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleModalCloseByEsc = (evt: KeyboardEvent): void => {
      if (evt.code === escapeBtn) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleModalCloseByEsc);

    if (isModalOpen || modalRoot?.children.length) {
      document.body.style.overflow = hiddenOverflow;
    }

    return () => {
      document.body.style.overflow = autoOverflow;
      window.removeEventListener('keydown', handleModalCloseByEsc);
    };
  }, [onClose, isModalOpen]);

  const handleModalCloseByClickOnBackdrop = (
    evt: MouseEvent<HTMLElement>
  ): void => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  if (!modalRoot) {
    return null;
  }

  const handleNavigation = (): void => {
    onClose();
    dispatch(resetAddProduct());
    dispatch(setPending(true));
    navigate(urls.VENDOR_GLOBAL_PRODUCTS);
  };

  return createPortal(
    <>
      <Backdrop onClick={handleModalCloseByClickOnBackdrop}>
        <Modal>
          <StyledCloseBtn onClick={onClose}>
            <CloseIcon />
          </StyledCloseBtn>
          <Box sx={{ margin: '0 auto', width: '94px', height: '94px' }}>
            <SuccessIcon />
          </Box>
          <ModalTitle variant="h1">{t('verificationtModal.title')}</ModalTitle>
          <ModalSubtitle>{t('verificationtModal.subtitle')}</ModalSubtitle>
          <StyledButton
            onClick={handleNavigation}
            width="200px"
            styles={StyleVariants.BLACK}
            sx={{
              display: 'block',
              padding: '12px, 64px',
              margin: '0 auto',
            }}
          >
            <Typography variant="h4">{t('verificationtModal.ok')}</Typography>
          </StyledButton>
        </Modal>
      </Backdrop>
    </>,
    modalRoot
  );
}

export default VerificationModal;
