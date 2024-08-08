import { useTranslation } from 'react-i18next';

import { Box, Button, TextField, Typography } from '@mui/material';

import { orderStatus } from 'src/common/constants';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import ProfileInputWrapper from 'src/pages/admin/AdminUserProfileEditPage/ProfileInputWrapper';
import { useRejectOrderMutation } from 'src/redux/order/orderService';
import theme from 'src/theme';

import styles from './styles';

interface IOrderActionProps {
  trackingNumber: string;
  onActionClick: (status: string) => void;
}

interface INewOrderProps extends IOrderActionProps {
  orderId: number;
}

const mockDays: string = '5 days';
const mockOverdue: string = '0 days';

export function NewOrderVendorAction({
  trackingNumber,
  onActionClick,
  orderId,
}: INewOrderProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [rejectOrder] = useRejectOrderMutation();

  const rejectOrderByVendor = async () => {
    try {
      await rejectOrder({
        orderId,
      }).unwrap();
    } catch {
      showToast('error', t('toasterMessages.failedToRejectOrder'));
    }
  };

  return (
    <Box sx={styles.newOrderVendorWrapper}>
      <ProfileInputWrapper label={t('vendorOrder.trackingNumber')}>
        <TextField
          autoComplete="off"
          defaultValue={trackingNumber}
          placeholder={t('vendorOrder.trackingPlaceholder')}
          sx={styles.input}
        />
        <Button
          sx={styles.sendButton}
          onClick={() => onActionClick(orderStatus.SENT)}
        >
          <Typography variant="h4" sx={{ color: theme.palette.common.white }}>
            {t('vendorOrder.send')}
          </Typography>
        </Button>
        <Button sx={styles.rejectButton} onClick={rejectOrderByVendor}>
          <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
            {t('vendorOrder.reject')}
          </Typography>
        </Button>
      </ProfileInputWrapper>
    </Box>
  );
}

export function SentVendorAction({
  trackingNumber,
}: {
  trackingNumber: string;
}) {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="8px"
      sx={{ marginBottom: '24px' }}
    >
      <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
        {t('vendorOrder.trackingNumber')}
      </Typography>
      <Typography sx={{ fontWeight: theme.typography.semiBold }}>
        {trackingNumber}
      </Typography>
    </Box>
  );
}

export function SentBuyerAction({
  trackingNumber,
  onActionClick,
}: IOrderActionProps) {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: '24px' }}
    >
      <Box display="flex" flexDirection="column" gap="8px">
        <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
          {t('vendorOrder.trackingNumber')}
        </Typography>
        <Typography sx={{ fontWeight: theme.typography.semiBold }}>
          {trackingNumber}
        </Typography>
      </Box>
      <Button
        sx={styles.rejectButton}
        onClick={() => onActionClick(orderStatus.RECEIVED)}
      >
        <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
          {t('vendorOrder.received')}
        </Typography>
      </Button>
    </Box>
  );
}

export function ReceivedBuyerAction({
  trackingNumber,
  onActionClick,
}: IOrderActionProps) {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{ marginBottom: '24px' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="8px"
        sx={{ marginBottom: '24px' }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
          {t('vendorOrder.rentDaysLeft')}
        </Typography>
        <Typography sx={{ fontWeight: theme.typography.semiBold }}>
          {mockDays}
        </Typography>
      </Box>
      <Box sx={styles.receivedWrapper}>
        <Box display="flex" flexDirection="column" height="74px">
          <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
            {t('vendorOrder.trackingNumber')}
          </Typography>
          <Box height="48px" padding="6px 0 12px 0">
            <TextField
              autoComplete="off"
              defaultValue={trackingNumber}
              placeholder={t('vendorOrder.trackingPlaceholder')}
              sx={styles.input}
            />
            <Button
              sx={styles.sendButton}
              onClick={() => onActionClick(orderStatus.SENT_BACK)}
            >
              <Typography
                variant="h4"
                sx={{ color: theme.palette.common.white }}
              >
                {t('vendorOrder.send')}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function ReceivedVendorAction() {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="8px"
      sx={{ marginBottom: '24px' }}
    >
      <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
        {t('vendorOrder.rentDaysLeft')}
      </Typography>
      <Typography sx={{ fontWeight: theme.typography.semiBold }}>
        {mockDays}
      </Typography>
    </Box>
  );
}

export function SentBackVendorAction({
  trackingNumber,
  onActionClick,
}: IOrderActionProps) {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: '24px' }}
    >
      <Box display="flex" flexDirection="column" gap="8px">
        <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
          {t('vendorOrder.trackingNumber')}
        </Typography>
        <Typography sx={{ fontWeight: theme.typography.semiBold }}>
          {trackingNumber}
        </Typography>
      </Box>
      <Button
        sx={styles.rejectButton}
        onClick={() => onActionClick(orderStatus.RETURNED)}
      >
        <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
          {t('vendorOrder.returned')}
        </Typography>
      </Button>
    </Box>
  );
}

export function SentBackBuyerAction({
  trackingNumber,
}: {
  trackingNumber: string;
}) {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="8px"
      sx={{ marginBottom: '24px' }}
    >
      <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
        {t('vendorOrder.trackingNumber')}
      </Typography>
      <Typography sx={{ fontWeight: theme.typography.semiBold }}>
        {trackingNumber}
      </Typography>
    </Box>
  );
}

export function ReturnedAction() {
  const { t } = useTranslation();

  return (
    <Box sx={styles.returnedWrapper}>
      <Button sx={styles.rejectButton}>
        <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
          {t('vendorOrder.leaveReview')}
        </Typography>
      </Button>
    </Box>
  );
}

export function OverdueBuyerAction({
  trackingNumber,
  onActionClick,
}: IOrderActionProps) {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{ marginBottom: '24px' }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="8px"
        sx={{ marginBottom: '24px' }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
          {t('vendorOrder.rentDaysLeft')}
        </Typography>
        <Typography sx={{ fontWeight: theme.typography.semiBold }}>
          {mockOverdue}
        </Typography>
      </Box>
      <Box sx={styles.receivedWrapper}>
        <Box display="flex" flexDirection="column" height="74px">
          <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
            {t('vendorOrder.trackingNumber')}
          </Typography>
          <Box height="48px" padding="6px 0 12px 0">
            <TextField
              autoComplete="off"
              defaultValue={trackingNumber}
              placeholder={t('vendorOrder.trackingPlaceholder')}
              sx={styles.input}
            />
            <Button
              sx={styles.sendButton}
              onClick={() => onActionClick(orderStatus.SENT_BACK)}
            >
              <Typography
                variant="h4"
                sx={{ color: theme.palette.common.white }}
              >
                {t('vendorOrder.paySend')}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export function OverdueVendorAction() {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="8px"
      sx={{ marginBottom: '24px' }}
    >
      <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
        {t('vendorOrder.rentDaysLeft')}
      </Typography>
      <Typography sx={{ fontWeight: theme.typography.semiBold }}>
        {mockOverdue}
      </Typography>
    </Box>
  );
}
