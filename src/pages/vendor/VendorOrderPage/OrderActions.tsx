import { useTranslation } from 'react-i18next';

import { Box, Button, TextField, Typography } from '@mui/material';

import { orderStatus, userRoles } from 'src/common/constants';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import ProfileInputWrapper from 'src/pages/admin/AdminUserProfileEditPage/ProfileInputWrapper';
import { useRejectOrderMutation } from 'src/redux/order/orderService';
import theme from 'src/theme';

import styles from './styles';

interface IOrderActionsProps {
  status: string | undefined;
  orderId: number;
  role: string | null;
  trackingNumber: string;
  onActionClick: (status: string) => void;
}

const mockDays: string = '5 days';
const mockOverdue: string = '0 days';

function OrderActions({
  status,
  orderId,
  role,
  trackingNumber,
  onActionClick,
}: IOrderActionsProps) {
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

  const renderButtons = () => {
    switch (status) {
      case orderStatus.NEW:
        return role === userRoles.VENDOR ? (
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
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.common.white,
                  }}
                >
                  {t('vendorOrder.send')}
                </Typography>
              </Button>
              <Button sx={styles.rejectButton} onClick={rejectOrderByVendor}>
                <Typography
                  variant="h4"
                  sx={{
                    color: theme.palette.common.black,
                  }}
                >
                  {t('vendorOrder.reject')}
                </Typography>
              </Button>
            </ProfileInputWrapper>
          </Box>
        ) : null;

      case orderStatus.SENT:
        return role === userRoles.VENDOR ? (
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
        ) : (
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
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.common.black,
                }}
              >
                {t('vendorOrder.received')}
              </Typography>
            </Button>
          </Box>
        );

      case orderStatus.RECEIVED:
        return role === userRoles.BUYER ? (
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
                      sx={{
                        color: theme.palette.common.white,
                      }}
                    >
                      {t('vendorOrder.send')}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
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

      case orderStatus.SENT_BACK:
        return role === userRoles.VENDOR ? (
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
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.common.black,
                }}
              >
                {t('vendorOrder.returned')}
              </Typography>
            </Button>
          </Box>
        ) : (
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

      case orderStatus.RETURNED:
        return (
          <Box sx={styles.returnedWrapper}>
            <Button sx={styles.rejectButton}>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.common.black,
                }}
              >
                {t('vendorOrder.leaveReview')}
              </Typography>
            </Button>
          </Box>
        );

      case orderStatus.OVERDUE:
        return role === userRoles.BUYER ? (
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
                      sx={{
                        color: theme.palette.common.white,
                      }}
                    >
                      {t('vendorOrder.paySend')}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
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

      default:
        return null;
    }
  };

  return <Box>{renderButtons()}</Box>;
}

export default OrderActions;
