import { Link } from 'react-router-dom';

import { IconButton } from '@mui/material';
import { Box, styled } from '@mui/system';

interface ITitleWrapperProps {
  greyBackground?: boolean;
}

export const TitleWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'greyBackground',
})<ITitleWrapperProps>(({ theme, greyBackground }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  [theme.breakpoints.up('sm')]: {
    margin: 0,
    background: greyBackground
      ? theme.palette.background.paper
      : theme.palette.background.default,
    padding: '32px 0',
    justifyContent: 'center',
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  padding: '0 6px',
  cursor: 'poiner',
  marginLeft: 'auto',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));
