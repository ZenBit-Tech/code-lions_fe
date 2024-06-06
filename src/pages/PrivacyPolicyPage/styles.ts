import { Box, styled } from '@mui/system';

export const SimpleSection = styled(Box)({
  padding: '0 16px',
});

export const TextWrapper = styled(Box)(({ theme }) => ({
  padding: '16px 25px 16px 16px',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.border.primary}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
}));

export const ArticleWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});
