import { Typography, TypographyProps } from '@mui/material';
import { Box, styled } from '@mui/system';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    margin: '44px 0 21px 0',
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
    [theme.breakpoints.up('sm')]: {
      color: theme.palette.text.primary,
      textAlign: center ? 'center' : 'left',
    },
  })
);
