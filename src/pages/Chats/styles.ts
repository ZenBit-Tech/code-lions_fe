import { Box, styled } from '@mui/system';

const SectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '10px',
  padding: '24px',
  paddingRight: '10px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '32px;',
  height: '76vh',
}));

export default SectionWrapper;
