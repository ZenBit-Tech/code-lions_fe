import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Box, IconButton } from '@mui/material';

import AcceptIcon from 'src/assets/icons/admin/accept.svg';
import RejectIcon from 'src/assets/icons/admin/reject.svg';
import LookIcon from 'src/assets/icons/eye.svg';
import useErrorHandling from 'src/common/hooks/useErrorHandlingHook';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import { useApproveProductMutation } from 'src/redux/adminProduct/adminProductService';

interface IActionButtons {
  productId: string;
  handleOpen: () => void;
}

function ActionButtonsRequest({ productId, handleOpen }: IActionButtons) {
  const location = useLocation();
  const { showToast } = useToast();
  const { t } = useTranslation();
  const { handleOnSubmitError } = useErrorHandling();

  const [approve, { isLoading }] = useApproveProductMutation();

  const handleApprove = async () => {
    try {
      await approve({ productId }).unwrap();
      showToast('success', t('productsAdmin.approveSuccess'));
    } catch (err) {
      handleOnSubmitError(err, showToast, t('productsAdmin.approveError'));
    }
  };

  return (
    <Box display="flex" gap="16px" alignItems="center">
      <IconButton
        sx={{ padding: 0 }}
        disabled={isLoading}
        onClick={handleApprove}
      >
        <AcceptIcon />
      </IconButton>
      <IconButton sx={{ padding: 0 }} onClick={handleOpen} disabled={isLoading}>
        <RejectIcon />
      </IconButton>
      <Link to={`${productId}`} state={{ from: location }}>
        <IconButton sx={{ padding: 0 }} disabled={isLoading}>
          <LookIcon />
        </IconButton>
      </Link>
    </Box>
  );
}

export default ActionButtonsRequest;
