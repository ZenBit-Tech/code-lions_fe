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

import { ModalTitle, Popup, IconBigWrapper, IconSmallWrapper } from './styles';

interface IRulesErrorPopup {
  onClose: () => void;
  errorMessage: string;
}

function RulesErrorPopup({ onClose, errorMessage }: IRulesErrorPopup) {
  const { t } = useTranslation();

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
          gap="12px"
          justifyContent="center"
          alignItems="center"
          width="80%"
        >
          <ModalTitle variant="body2">{errorMessage}</ModalTitle>
        </Box>
      </Box>
      <Box margin="0 5px" display="flex" justifyContent="center">
        <StyledButton
          width="30%"
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

export default RulesErrorPopup;
