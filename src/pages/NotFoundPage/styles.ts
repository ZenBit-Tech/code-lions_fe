import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  fontWeight: theme.typography.fontWeightRegular,
}));

const StyledLink = styled('a')(({ theme }) => ({
  color: theme.palette.success.dark,
}));

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width:600px)': {
    margin: '44px 0 21px 0',
  },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
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

const TextWrapper = styled(Box)(({ theme }) => ({
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

const ArticleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  [theme.breakpoints.up('sm')]: {
    gap: '32px',
  },
}));

export {
  StyledLink,
  StyledTypography,
  ArticleWrapper,
  SectionWrapper,
  TextWrapper,
};
