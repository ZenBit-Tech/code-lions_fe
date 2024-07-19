import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import ImageForm from 'src/components/shared/ImageForm';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import { increaseAddProductStep } from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';
// import { addPhoto } from 'src/redux/addProduct/addProductSlice';
import theme from 'src/theme';

import { AddProductHeader4, AddProductText } from './styles';

function ImagesForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const goToNextStep = () => {
    dispatch(increaseAddProductStep());
    // dispatch(addPhoto());
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
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '150px',
          }}
        >
          <AddProductHeader4 component="h4">
            {t('addProduct.photo')}
          </AddProductHeader4>
          <AddProductText variant="subtitle2">
            {t('addProduct.photoSubtitle')}
          </AddProductText>
        </Box>
        <Box sx={{ flex: 1 }}>
          <ImageForm />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginTop: '24px',
        }}
      >
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

export default ImagesForm;
