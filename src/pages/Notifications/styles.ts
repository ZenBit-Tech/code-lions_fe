import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const SectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '10px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const NotificationMassage = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  border: `1px solid ${theme.palette.border.light}`,
  padding: '12px',
  marginBottom: '20px',
  width: '100%',
  maxWidth: '1000px',
}));

const NotificationHeader = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const Notification = styled(Typography)(({ theme }) => ({
  padding: '12px 16px 12px 0px',
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: theme.typography.h1.fontWeight,
  fontSize: theme.typography.h5.fontSize,
}));

const NotificationTitle = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h1.fontFamily,
  fontWeight: theme.typography.h3.fontWeight,
  fontSize: theme.typography.h3.fontSize,
  marginBottom: '4px',
}));

const NoNotification = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.h3.fontFamily,
  fontWeight: theme.typography.h3.fontWeight,
  fontSize: theme.typography.h2.fontSize,
  marginBottom: '20%',
}));

const NotificationText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
}));

export {
  SectionWrapper,
  Notification,
  NotificationMassage,
  NotificationTitle,
  NotificationHeader,
  NoNotification,
  NotificationText,
};
