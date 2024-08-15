import { MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import CloseIcon from 'src/assets/icons/close.svg';
import DeleteIcon from 'src/assets/icons/delete-trash-red.svg';
import { urls } from 'src/common/constants';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import {
  resetAddProduct,
  setPending,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';

import {
  Backdrop,
  IconBigWrapper,
  IconSmallWrapper,
  Modal,
  ModalSubtitle,
  ModalTitle,
  StyledButtonsList,
  StyledCloseBtn,
} from './styles';

interface IRejectProductFlowModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  modalSubtitle: string;
}

const modalRoot = document.querySelector('#modal-root');
const escapeBtn: string = 'Escape';
const hiddenOverflow: string = 'hidden';
const autoOverflow: string = 'auto';

function RejectProductFlowModal({
  isModalOpen,
  onClose,
  modalTitle,
  modalSubtitle,
}: IRejectProductFlowModalProps) {
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
          <IconBigWrapper>
            <IconSmallWrapper>
              <DeleteIcon />
            </IconSmallWrapper>
          </IconBigWrapper>
          <ModalTitle variant="h1">{modalTitle}</ModalTitle>
          <ModalSubtitle>{modalSubtitle}</ModalSubtitle>
          <StyledButtonsList>
            <li>
              <StyledButton
                onClick={onClose}
                width="200px"
                styles={StyleVariants.TRANSPARENT}
                padding={PaddingVariants.XL}
              >
                <Typography variant="h4">{t('editModal.no')}</Typography>
              </StyledButton>
            </li>
            <li>
              <StyledButton
                width="200px"
                styles={StyleVariants.RED}
                padding={PaddingVariants.XL}
                onClick={handleNavigation}
              >
                <Typography variant="h4">{t('editModal.yes')}</Typography>
              </StyledButton>
            </li>
          </StyledButtonsList>
        </Modal>
      </Backdrop>
    </>,
    modalRoot
  );
}

export default RejectProductFlowModal;
