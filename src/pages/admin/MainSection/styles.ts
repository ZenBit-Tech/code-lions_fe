import { Box, styled } from '@mui/system';

const SectionStyled = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  padding: '30px 32px',
  minHeight: 'calc(100% - 70px)',
}));

export default SectionStyled;
