import { Box, styled } from '@mui/system';
import { Link } from 'react-router-dom';

interface ITitleWrapperProps {
  greyBackground?: boolean;
}

export const TitleWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'greyBackground',
})<ITitleWrapperProps>(({ theme, greyBackground }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginTop: '12px',
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
