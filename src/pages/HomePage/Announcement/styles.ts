import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

import rightImg from 'src/assets/photos/womanWithBag.png';
import theme from 'src/theme.tsx';

export const AnnouncementWrapper = styled(Box)({
  position: 'relative',
  backgroundColor: theme.palette.primary.light,
  overflow: 'hidden',
  color: theme.palette.common.black,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  padding: '50px 0px 73px 0px',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    bottom: -100,
    width: '200px',
    height: '200px',
  },
  '&::before': {
    left: -20,
    bottom: -70,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '50%',
  },
  '&::after': {
    right: -140,
    top: -190,
    width: '600px',
    height: '600px',
    backgroundImage: `url(${rightImg})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
});

export const AnnouncementTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '8px',
});

export const AnnouncementSubtitle = styled(Typography)({
  color: 'inherit',
});
