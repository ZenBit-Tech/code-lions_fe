import { Typography, TypographyProps } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Link } from 'react-router-dom';

export const SimpleSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 16px',
  [theme.breakpoints.up('sm')]: {
    padding: 0,
  },
}));

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width:600px)': {
    margin: '44px 0 21px 0',
  },
}));

export const TitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginTop: '12px',
  [theme.breakpoints.up('sm')]: {
    margin: 0,
    background: theme.palette.background.paper,
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

export const SectionWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: '12px',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '0 50px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '0 100px',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '0 165px',
  },
}));

export const TextWrapper = styled(Box)(({ theme }) => ({
  padding: '16px',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.border.primary}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  [theme.breakpoints.up('sm')]: {
    border: 'none',
    padding: '64px 32px',
  },
}));

export const ArticleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  [theme.breakpoints.up('sm')]: {
    gap: '32px',
  },
}));

interface TitleStyledProps extends TypographyProps {
  center?: boolean;
}

export const TitleStyled = styled(Typography)<TitleStyledProps>(
  ({ theme, center }) => ({
    color: theme.palette.text.primary,
    textAlign: center ? 'center' : 'left',
    [theme.breakpoints.up('sm')]: {
      color: theme.palette.text.primary,
    },
  })
);

export const StyledHeader3 = styled(Typography)(({ theme }) => ({
  margin: '70px 0 14px',
  color: theme.palette.common.black,
  fontFamily: 'DM Sans, Arial, sans-serif',
  fontSize: 24,
  fontWeight: 400,
  lineHeight: '1.83',
}));
