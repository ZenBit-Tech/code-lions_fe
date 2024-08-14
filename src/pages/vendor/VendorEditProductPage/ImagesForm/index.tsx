import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import ImageForm from 'src/components/shared/ImageForm';
import RejectProductFlowModal from 'src/components/shared/RejectProductFlowModal';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import { increaseAddProductStep } from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';
import theme from 'src/theme';

import { AddProductHeader4, AddProductText } from './styles';

function ImagesForm() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);

  const toggleRejectModal = (): void => {
    setIsRejectModalOpen(!isRejectModalOpen);
  };

  const goToNextStep = () => {
    dispatch(increaseAddProductStep());
  };

  return (
    <>
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
          <StyledButton
            styles={StyleVariants.RED}
            padding={PaddingVariants.SM}
            variant="contained"
            fontSize={String(theme.typography.h4.fontSize)}
            fontFamily={theme.typography.fontFamily}
            onClick={toggleRejectModal}
          >
            {t('editProduct.cancelBtn')}
          </StyledButton>
        </Box>
      </Box>
      {isRejectModalOpen && (
        <RejectProductFlowModal
          isModalOpen={isRejectModalOpen}
          onClose={toggleRejectModal}
          modalTitle={t('editModal.title')}
          modalSubtitle={t('editModal.subtitle')}
        />
      )}
    </>
  );
}

export default ImagesForm;
