import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

import theme from 'src/theme';

export const StyledCard = styled(Box)({
  width: '308px',
  border: `1px solid ${theme.palette.border.secondary}`,
  borderRadius: '8px',
  padding: '16px 25px 16px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const StyledImage = styled('img')({
  width: '40px',
  height: '40px',
  border: `1px solid ${theme.palette.border.secondary}`,
  padding: '8px 5px',
});

export const StyledCardFooter = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const StyledStatus = styled(Typography)({});
