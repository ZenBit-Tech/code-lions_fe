import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const SectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '10px',
  padding: '24px',
  display: 'flex',
  gap: '12px',
}));

export default SectionWrapper;
