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

const minimumFee = 0;
const maximumFee = 1;

function AdminStripe() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const { data: fee, isLoading, refetch } = useGetApplicationFeeQuery();
  const [updateApplicationFee, { isLoading: isUpdating }] =
    useUpdateApplicationFeeMutation();

  const [applicationFee, setApplicationFee] = useState<number | string>('');

  useEffect(() => {
    if (fee !== undefined) {
      setApplicationFee(fee);
    }
  }, [fee]);

  const handleButtonClick = async () => {
    try {
      const parsedFee = parseFloat(applicationFee as string);

      if (
        Number.isNaN(parsedFee) ||
        parsedFee <= minimumFee ||
        parsedFee >= maximumFee
      ) {
        showToast('error', t('stripeAdmin.invalidFee'));

        return;
      }

      await updateApplicationFee({ applicationFee: parsedFee });
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
