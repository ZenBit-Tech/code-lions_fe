import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';

import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';

import AddressEditForm from '../AddressEditForm';
import { TitleStyled } from '../PersonalInformationForm/styles';

import { AddressBox, AddressText } from './styles';

function AddressForm() {
  const { t } = useTranslation();
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <TitleStyled variant="subtitle1">
        {t('profileDetails.address')}
      </TitleStyled>
      {!showEdit && (
        <AddressBox>
          <AddressText variant="subtitle2">street</AddressText>
          <AddressText variant="subtitle2">City</AddressText>
          <AddressText variant="subtitle2">State</AddressText>
          <AddressText variant="subtitle2" mb="8px">
            Canada
          </AddressText>
          <StyledButton
            type="button"
            onClick={() => setShowEdit(true)}
            width="101px"
            styles={StyleVariants.TRANSPARENT}
            padding={PaddingVariants.SM}
          >
            <Typography variant="h4">
              {t('profileDetails.editButton')}
            </Typography>
          </StyledButton>
        </AddressBox>
      )}
      {showEdit && <AddressEditForm setShowEdit={setShowEdit} />}
    </>
  );
}

export default AddressForm;
