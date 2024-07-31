import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const SectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '10px',
  padding: '24px',
  paddingRight: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '2rem',
  height: '76vh',
}));

const TextWrapper = styled(Box)(({ theme }) => ({
  ...theme.typography.h2,
  height: '100%',
  maxWidth: '100%',
  minWidth: '60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export { SectionWrapper, TextWrapper };
