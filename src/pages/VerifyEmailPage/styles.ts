import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const OtpContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '335px',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
}));

export const TitleContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: '8px',
  width: '100%',
}));

export const TimerContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px',
  alignItems: 'center',
  width: '100%',
}));