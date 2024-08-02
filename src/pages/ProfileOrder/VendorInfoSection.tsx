import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

import { Box, Typography, Button } from '@mui/material';

import Chat from 'src/assets/icons/vendor/chat-white.svg';
import { urls } from 'src/common/constants';
import useToast from 'src/components/shared/toasts/components/ToastProvider/ToastProviderHooks';
import AdminSectionSubTitle from 'src/pages/admin/AdminSectionSubTitle';
import { useCreateChatMutation } from 'src/redux/chat/chatService';
import { IAddress } from 'src/redux/order/types';
import theme from 'src/theme';

import styles from './styles';

interface IVendorInfoSection {
  userName: string;
  userId: string;
  address: IAddress;
}

function VendorInfoSection({ userName, userId, address }: IVendorInfoSection) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const [createChat] = useCreateChatMutation();

  const goToChat = async () => {
    try {
      const result = await createChat({
        chatPartnerId: userId,
      }).unwrap();

      navigate(`${urls.BUYER_CHATS}/${result.id}`);
    } catch {
      showToast('error', t('toasterMessages.failedCreateChat'));
    }
  };

  return (
    <Box display="flex" flexDirection="column" sx={{ padding: '0 24px' }}>
      <AdminSectionSubTitle title={`${t('vendorOrder.vendor')}`} />
      <Box sx={{ margin: '24px 0' }}>
        <Link to={`${urls.VENDOR}/${userId}`} state={{ from: location }}>
          <Typography variant="h4">{userName}</Typography>
        </Link>

        <Button sx={styles.chatButton} startIcon={<Chat />} onClick={goToChat}>
          <Typography variant="h4" sx={{ color: theme.palette.common.white }}>
            {t('vendorOrder.chat')}
          </Typography>
        </Button>
      </Box>
      <AdminSectionSubTitle title={`${t('vendorOrder.address')}`} />
      <Box>
        <Typography variant="h4" sx={{ margin: '24px 0 12px 0' }}>
          {userName}
        </Typography>
        <Typography variant="h4">{address.addressLine1}</Typography>
        <Typography variant="h4">{address.addressLine2}</Typography>
        <Typography variant="h4">{`${address.city}, ${address.state}, ${address.country}`}</Typography>
      </Box>
    </Box>
  );
}

export default VendorInfoSection;
