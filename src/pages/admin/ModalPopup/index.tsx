import { useTranslation } from 'react-i18next';

import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import CloseIcon from 'src/assets/icons/close.svg';
import DeleteIcon from 'src/assets/icons/delete-trash-red.svg';
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

function ModalPopup({ onClose }: IModalPopup) {
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
        >
          <Typography variant="h4">{t('modalPopup.deleteButton')} </Typography>
        </StyledButton>
      </Box>
    </Popup>
  );
}

export default ModalPopup;
