import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';

import StyledButton from 'src/components/shared/StyledButton';
import { StyleVariants } from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import {
  useGetApplicationFeeQuery,
  useUpdateApplicationFeeMutation,
} from 'src/redux/stripe/stripeService';

import AdminSectionTitle from '../AdminSectionTitle';

import SectionWrapper from './styles';

const minimumFeePercentage = 0;
const maximumFeePercentage = 100;
const fixedChars = 2;

function AdminStripe() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const { data: fee, isLoading, refetch } = useGetApplicationFeeQuery();
  const [updateApplicationFee, { isLoading: isUpdating }] =
    useUpdateApplicationFeeMutation();

  const [applicationFee, setApplicationFee] = useState<string>('');

  useEffect(() => {
    if (fee !== undefined) {
      setApplicationFee((fee * maximumFeePercentage).toFixed(fixedChars));
    }
  }, [fee]);

  const handleButtonClick = async () => {
    try {
      const parsedFee = parseFloat(applicationFee);

      if (
        Number.isNaN(parsedFee) ||
        parsedFee < minimumFeePercentage ||
        parsedFee > maximumFeePercentage
      ) {
        showToast('error', t('stripeAdmin.invalidFee'));

        return;
      }

      const decimalFee = parsedFee / maximumFeePercentage;

      await updateApplicationFee({ applicationFee: decimalFee });
      showToast('success', t('stripeAdmin.updateSuccess'));
      refetch();
    } catch (error) {
      showToast('error', t('stripeAdmin.updateError'));
    }
  };

  return (
    <>
      <AdminSectionTitle title={t('sidebar.stripeFees')} fontWeight={600} />
      <SectionWrapper>
        <TextField
          variant="outlined"
          label={t('stripeAdmin.stripeFee')}
          size="small"
          value={applicationFee}
          onChange={(e) => setApplicationFee(e.target.value)}
          disabled={isLoading || isUpdating}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <StyledButton
          styles={StyleVariants.BLACK}
          onClick={handleButtonClick}
          disabled={isUpdating}
        >
          {t('stripeAdmin.submit')}
        </StyledButton>
      </SectionWrapper>
    </>
  );
}

export default AdminStripe;
