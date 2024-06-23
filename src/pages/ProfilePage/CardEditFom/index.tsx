import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import LabelText from 'src/components/shared/LabelText';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import StyledInput from 'src/components/shared/StyledInput';
import {
  InputPaddingVariants,
  InputStyleVariants,
} from 'src/components/shared/StyledInput/types';
import TitleInputWrapper from 'src/components/shared/TitleInputWrapper';

interface ICardEditForm {
  setShowEdit: (arg0: boolean) => void;
}

function CardEditForm({ setShowEdit }: ICardEditForm) {
  const { t } = useTranslation();

  return (
    <Box sx={{ flex: 1 }} mt="20px">
      <TitleInputWrapper>
        <LabelText>{t('onboarding.cardNumber')}</LabelText>
        <StyledInput
          fullWidth
          autoComplete="off"
          placeholder={t('onboarding.cardNumberValue')}
          padding={InputPaddingVariants.MD}
          stylevariant={InputStyleVariants.OUTLINED}
          width="100%"
        />
      </TitleInputWrapper>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          mt: '20px',
          mb: '20px',
        }}
      >
        <Box sx={{ width: '57%' }}>
          <TitleInputWrapper>
            <LabelText>{t('onboarding.expiryDate')}</LabelText>
            <StyledInput
              fullWidth
              autoComplete="off"
              placeholder={t('onboarding.mmYy')}
              padding={InputPaddingVariants.MD}
              stylevariant={InputStyleVariants.OUTLINED}
              width="100%"
            />
          </TitleInputWrapper>
        </Box>
        <Box sx={{ width: '43%' }}>
          <TitleInputWrapper>
            <LabelText>{t('onboarding.cvvCode')}</LabelText>
            <StyledInput
              fullWidth
              autoComplete="off"
              placeholder={t('onboarding.cvvCodeValue')}
              padding={InputPaddingVariants.MD}
              stylevariant={InputStyleVariants.OUTLINED}
              width="100%"
            />
          </TitleInputWrapper>
        </Box>
      </Box>
      <StyledButton
        type="submit"
        onClick={() => setShowEdit(false)}
        width="101px"
        styles={StyleVariants.BLACK}
        padding={PaddingVariants.SM}
      >
        <Typography variant="h4">{t('profileDetails.saveButton')}</Typography>
      </StyledButton>
    </Box>
  );
}

export default CardEditForm;
