import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography } from '@mui/material';

import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import { useAppSelector } from 'src/redux/hooks';
import { selectUser } from 'src/redux/user/userSlice';

import AddressEditForm from '../AddressEditForm';
import { TitleStyled } from '../PersonalInformationForm/styles';

import { AddressBox, AddressText } from './styles';

function AddressForm() {
  const { t } = useTranslation();
  const [showEdit, setShowEdit] = useState(false);
  const user = useAppSelector(selectUser);

  return (
    <>
      <TitleStyled variant="subtitle1">
        {t('profileDetails.address')}
      </TitleStyled>
      {!showEdit && (
        <AddressBox>
          <Box display="flex" gap="4px">
            <AddressText variant="subtitle2">{user.addressLine1}</AddressText>
            <AddressText variant="subtitle2">{user.addressLine2}</AddressText>
          </Box>
          <AddressText variant="subtitle2">{user.city}</AddressText>
          <AddressText variant="subtitle2">{user.state}</AddressText>
          <AddressText variant="subtitle2" mb="8px">
            {user.country}
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
