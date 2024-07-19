import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import {
  increaseAddProductStep,
  decreaseAddProductStep,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';
import theme from 'src/theme';

function ProductDescriptionForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const returnBack = () => {
    dispatch(decreaseAddProductStep());
  };

  const goToNextStep = () => {
    dispatch(increaseAddProductStep());
  };

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        padding: '24px',
        borderRadius: '0 0 8px 8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '24px',
        }}
      >
        <StyledButton
          styles={StyleVariants.TRANSPARENT2}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize={String(theme.typography.h4.fontSize)}
          fontFamily={theme.typography.fontFamily}
          onClick={returnBack}
        >
          {t('onboarding.prev')}
        </StyledButton>
        <StyledButton
          styles={StyleVariants.BLACK}
          padding={PaddingVariants.SM}
          variant="contained"
          fontSize={String(theme.typography.h4.fontSize)}
          fontFamily={theme.typography.fontFamily}
          radius="8px"
          onClick={goToNextStep}
        >
          {t('onboarding.next')}
        </StyledButton>
      </Box>
    </Box>
  );
}

export default ProductDescriptionForm;
