import { useCallback, useState, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { Box, Button, TextField, Typography } from '@mui/material';

import { orderStatus } from 'src/common/constants';
import millisecondsToDays from 'src/common/millisecondsToDays';
import ReviewModal from 'src/components/shared/ReviewModal';
import StyledBackdrop from 'src/components/shared/StyledBackdrop';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import ProfileInputWrapper from 'src/pages/admin/AdminUserProfileEditPage/ProfileInputWrapper';
import {
  usePaySendOrderMutation,
  useReceiveOrderMutation,
  useReturnOrderMutation,
  useSendBackOrderMutation,
  useSendOrderMutation,
} from 'src/redux/order/orderService';
import { IOrder } from 'src/redux/order/types';
import theme from 'src/theme';

import RejectOrderModal from './RejectOrderModal';
import styles from './styles';

interface INewOrderProps {
  orderId: number;
}

interface IActionProps {
  order: IOrder;
}

export function NewOrderVendorAction({ orderId }: INewOrderProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [trackingNumber, setTrackingNumber] = useState<string>('');

  const handleModalOpen = useCallback(() => setShowModal(true), []);
  const handleModalClose = useCallback(() => setShowModal(false), []);

  const [sendOrder] = useSendOrderMutation();

  const sendOrderByVendor = async () => {
    if (!trackingNumber.trim()) {
      showToast('error', t('toasterMessages.trackingNumberRequired'));

      return;
    }

    try {
      await sendOrder({
        orderId,
        trackingNumber,
      }).unwrap();

      setTrackingNumber('');
    } catch {
      showToast('error', t('toasterMessages.failedToSendOrder'));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value);
  };

  return (
    <>
      {showModal &&
        createPortal(
          <StyledBackdrop showModal={showModal}>
            <RejectOrderModal onClose={handleModalClose} orderId={orderId} />
          </StyledBackdrop>,
          document.body
        )}
      <Box sx={styles.newOrderVendorWrapper}>
        <ProfileInputWrapper label={t('vendorOrder.trackingNumber')}>
          <TextField
            autoComplete="off"
            value={trackingNumber}
            placeholder={t('vendorOrder.trackingPlaceholder')}
            sx={styles.input}
            onChange={handleInputChange}
          />
          <Button sx={styles.sendButton} onClick={sendOrderByVendor}>
            <Typography variant="h4" sx={{ color: theme.palette.common.white }}>
              {t('vendorOrder.send')}
            </Typography>
          </Button>
          <Button sx={styles.rejectButton} onClick={handleModalOpen}>
            <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
              {t('vendorOrder.reject')}
            </Typography>
          </Button>
        </ProfileInputWrapper>
      </Box>
    </>
  );
}

export function NewOrderBuyerAction({ orderId }: INewOrderProps) {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalOpen = useCallback(() => setShowModal(true), []);
  const handleModalClose = useCallback(() => setShowModal(false), []);

  return (
    <>
      {showModal &&
        createPortal(
          <StyledBackdrop showModal={showModal}>
            <RejectOrderModal onClose={handleModalClose} orderId={orderId} />
          </StyledBackdrop>,
          document.body
        )}
      <Box sx={styles.newOrderVendorWrapper}>
        <Button sx={styles.rejectButton} onClick={handleModalOpen}>
          <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
            {t('vendorOrder.reject')}
          </Typography>
        </Button>
      </Box>
    </>
  );
}

export function RejectedAction({ order }: IActionProps) {
  const { t } = useTranslation();

  return (
    <Box display="flex">
      <Box
        display="flex"
        flexDirection="column"
        gap="8px"
        sx={{ marginBottom: '24px', width: '33%' }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
          {t('vendorOrder.rejectedBy')}
        </Typography>
        <Typography sx={{ fontWeight: theme.typography.semiBold }}>
          {order.rejectedBy}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="8px"
        sx={{ marginBottom: '24px' }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
          {t('vendorOrder.rejectReason')}
        </Typography>
        <Typography sx={{ fontWeight: theme.typography.semiBold }}>
          {order.rejectReason}
        </Typography>
      </Box>
    </Box>
  );
}

export function SentVendorAction({ order }: IActionProps) {
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
        {order.trackingNumber}
      </Typography>
    </Box>
  );
}

export function SentBuyerAction({ order }: IActionProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [receiveOrder] = useReceiveOrderMutation();

  const receiveOrderByBuyer = async () => {
    try {
      await receiveOrder({
        orderId: order.orderId,
      }).unwrap();
    } catch {
      showToast('error', t('toasterMessages.failedToReceiveOrder'));
    }
  };

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
          {order.trackingNumber}
        </Typography>
      </Box>
      <Button sx={styles.rejectButton} onClick={receiveOrderByBuyer}>
        <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
          {t('vendorOrder.received')}
        </Typography>
      </Button>
    </Box>
  );
}

export function ReceivedBuyerAction({ order }: IActionProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [trackingNumber, setTrackingNumber] = useState<string>('');

  const [sendBackOrder] = useSendBackOrderMutation();

  const sendOrderByBuyer = async () => {
    if (!trackingNumber.trim()) {
      showToast('error', t('toasterMessages.trackingNumberRequired'));

      return;
    }

    try {
      await sendBackOrder({
        orderId: order.orderId,
        trackingNumber,
      }).unwrap();

      setTrackingNumber('');
    } catch {
      showToast('error', t('toasterMessages.failedToSendBack'));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value);
  };

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
          {`${millisecondsToDays(order.timer)} ${t('profileOrders.days')}`}
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
              placeholder={t('vendorOrder.trackingPlaceholder')}
              sx={styles.input}
              value={trackingNumber}
              onChange={handleInputChange}
            />
            <Button sx={styles.sendButton} onClick={sendOrderByBuyer}>
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

export function ReceivedVendorAction({ order }: IActionProps) {
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
        {`${millisecondsToDays(order.timer)} ${t('profileOrders.days')}`}
      </Typography>
    </Box>
  );
}

export function SentBackVendorAction({ order }: IActionProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [returnOrder] = useReturnOrderMutation();

  const returnOrderByVendor = async () => {
    try {
      await returnOrder({
        orderId: order.orderId,
      }).unwrap();
    } catch {
      showToast('error', t('toasterMessages.failedToReturnOrder'));
    }
  };

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
          {order.trackingNumber}
        </Typography>
      </Box>
      <Button sx={styles.rejectButton} onClick={returnOrderByVendor}>
        <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
          {t('vendorOrder.returned')}
        </Typography>
      </Button>
    </Box>
  );
}

export function SentBackBuyerAction({ order }: IActionProps) {
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
        {order.trackingNumber}
      </Typography>
    </Box>
  );
}

export function ReturnedBuyerAction({ order }: IActionProps) {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      {isModalOpen &&
        createPortal(
          <StyledBackdrop showModal={isModalOpen}>
            <ReviewModal
              isModalOpen={isModalOpen}
              onClose={handleModalClose}
              userId={order.vendorId}
              reviewerId={order.buyerId}
              orderId={order.orderId}
            />
          </StyledBackdrop>,
          document.body
        )}
      <Box sx={styles.returnedWrapper}>
        <Button sx={styles.rejectButton} onClick={handleModalOpen}>
          <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
            {t('vendorOrder.leaveReview')}
          </Typography>
        </Button>
      </Box>
    </>
  );
}

export function ReturnedVendorAction({ order }: IActionProps) {
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      {isModalOpen &&
        createPortal(
          <StyledBackdrop showModal={isModalOpen}>
            <ReviewModal
              isModalOpen={isModalOpen}
              onClose={handleModalClose}
              userId={order.buyerId}
              reviewerId={order.vendorId}
              orderId={order.orderId}
            />
          </StyledBackdrop>,
          document.body
        )}
      <Box sx={styles.returnedWrapper}>
        <Button sx={styles.rejectButton} onClick={handleModalOpen}>
          <Typography variant="h4" sx={{ color: theme.palette.common.black }}>
            {t('vendorOrder.leaveReview')}
          </Typography>
        </Button>
      </Box>
    </>
  );
}

export function OverdueBuyerAction({ order }: IActionProps) {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [trackingNumber, setTrackingNumber] = useState<string>('');

  const overdueDays = millisecondsToDays(order.timer);

  const [paySendOrder, { isLoading }] = usePaySendOrderMutation();

  const paySendOrderByBuyer = async () => {
    if (!trackingNumber.trim()) {
      showToast('error', t('toasterMessages.trackingNumberRequired'));

      return;
    }

    try {
      const result = await paySendOrder({
        orderId: order.orderId,
        trackingNumber,
      }).unwrap();

      if (result.url) {
        window.location.href = result.url;
      } else {
        throw new Error();
      }

      setTrackingNumber('');
    } catch {
      showToast('error', t('toasterMessages.failedToPaySendOrder'));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackingNumber(e.target.value);
  };

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
          {order.status === orderStatus.OVERDUE
            ? t('profileOrders.daysInOverdue')
            : t('vendorOrder.rentDaysLeft')}
        </Typography>
        <Typography sx={{ fontWeight: theme.typography.semiBold }}>
          {`${overdueDays} ${t('profileOrders.days')}`}
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
              value={trackingNumber}
              placeholder={t('vendorOrder.trackingPlaceholder')}
              sx={styles.input}
              onChange={handleInputChange}
            />
            <Button
              sx={styles.sendButton}
              onClick={paySendOrderByBuyer}
              disabled={isLoading}
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

export function OverdueVendorAction({ order }: IActionProps) {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="8px"
      sx={{ marginBottom: '24px' }}
    >
      <Typography variant="h4" sx={{ color: theme.palette.grey[400] }}>
        {t('profileOrders.daysInOverdue')}
      </Typography>
      <Typography sx={{ fontWeight: theme.typography.semiBold }}>
        {`${millisecondsToDays(order.timer)} ${t('profileOrders.days')}`}
      </Typography>
    </Box>
  );
}
