import { useTranslation } from 'react-i18next';

import { TextField } from '@mui/material';

import StyledButton from 'src/components/shared/StyledButton';
import { StyleVariants } from 'src/components/shared/StyledButton/types';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';

import AdminSectionTitle from '../AdminSectionTitle';

import SectionWrapper from './styles';

function AdminStripe() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const handleButtonClick = () => {
    showToast('success', 'success');
  };

  return (
    <>
      <AdminSectionTitle title={t('sidebar.stripeFees')} fontWeight={600} />
      <SectionWrapper>
        <TextField
          variant="outlined"
          label={t('stripeAdmin.stripeFee')}
          size="small"
        />
        <StyledButton styles={StyleVariants.BLACK} onClick={handleButtonClick}>
          {t('stripeAdmin.submit')}
        </StyledButton>
      </SectionWrapper>
    </>
  );
}

export default AdminStripe;
