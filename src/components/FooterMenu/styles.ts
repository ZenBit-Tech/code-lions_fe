import { Link } from 'react-router-dom';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MenuColumn = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '13px',
  minWidth: '134px',
}));

export const MenuLink = styled(Link)(({ theme }) => ({
  fontWeight: theme.typography.body1.fontWeight,
  fontFamily: theme.typography.h4.fontFamily,
  fontSize: theme.typography.h4.fontSize,
  lineHeight: 1.51,
  color: theme.palette.common.black,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.text.disabled,
  },
}));

export const MenuMainLink = styled(Link)(({ theme }) => ({
  fontWeight: theme.typography.bold.fontWeight,
  fontFamily: theme.typography.h2.fontFamily,
  fontSize: theme.typography.h4.fontSize,
  lineHeight: 1.71,
  color: theme.palette.common.black,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.text.disabled,
  },
}));
