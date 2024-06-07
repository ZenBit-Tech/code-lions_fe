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

export const TitleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginTop: '12px',
  [theme.breakpoints.up('sm')]: {
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
  marginTop: '12px',
  padding: '16px',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.border.primary}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  [theme.breakpoints.up('sm')]: {
    border: 'none',
  },
}));

export const ArticleWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
});
