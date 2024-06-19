import { Box, styled } from '@mui/system';

const SectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '10px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px;',
}));

export default SectionWrapper;
