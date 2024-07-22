import { useTranslation } from 'react-i18next';

import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import CloseIcon from 'src/assets/icons/close.svg';
import RedCrossIcon from 'src/assets/icons/vendor/red-cross.svg';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';

import {
  ModalTitle,
  ModalDescription,
  IconSmallWrapper,
  IconBigWrapper,
  Popup,
} from './styles';

interface IModalPopup {
  onClose: () => void;
}

function PreviewModePopup({ onClose }: IModalPopup) {
  const { t } = useTranslation();

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
            <RedCrossIcon />
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
          <ModalTitle variant="h1">{t('product.modalTitle')}</ModalTitle>
          <ModalDescription>{t('product.modalText')}</ModalDescription>
        </Box>
      </Box>
      <Box margin="0 5px" display="flex">
        <StyledButton
          fullWidth
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.LG}
          onClick={onClose}
        >
          <Typography variant="h4">{t('product.ok')} </Typography>
        </StyledButton>
      </Box>
    </Popup>
  );
}

export default PreviewModePopup;
