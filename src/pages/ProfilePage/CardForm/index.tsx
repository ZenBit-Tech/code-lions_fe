import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Box } from '@mui/material';

import EditIcon from 'src/assets/icons/edit-grey.svg';
import maskCardNumber from 'src/common/maskCardNumber';
import { useAppSelector } from 'src/redux/hooks';
import { useGetCardInfoQuery } from 'src/redux/user/userService';
import { selectUserId } from 'src/redux/user/userSlice';

import CardEditForm from '../CardEditFom';
import { TitleStyled } from '../PersonalInformationForm/styles';

import { SmallTitle, CardNumber } from './styles';

function CardForm() {
  const { t } = useTranslation();
  const [showEdit, setShowEdit] = useState(false);
  const id = useAppSelector(selectUserId);
  const { data, refetch } = useGetCardInfoQuery({ id });
  const cardNumber = data?.cardNumber ?? '';

  const maskedCard = maskCardNumber(cardNumber);

  return (
    <>
      <TitleStyled variant="subtitle1">
        {t('profileDetails.paymentMethod')}
      </TitleStyled>
      {!showEdit && (
        <Box width="310px" mt="20px">
          <SmallTitle variant="subtitle1">
            {t('profileDetails.card')}
          </SmallTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            mt="8px"
            alignItems="center"
          >
            <CardNumber variant="body1">{maskedCard}</CardNumber>
            <IconButton type="button" onClick={() => setShowEdit(true)}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      )}
      {showEdit && (
        <CardEditForm
          setShowEdit={setShowEdit}
          cardData={data ?? { cardNumber: '', expireDate: '', cvvCode: '' }}
          refetchCardInfo={refetch}
        />
      )}
    </>
  );
}

export default CardForm;
