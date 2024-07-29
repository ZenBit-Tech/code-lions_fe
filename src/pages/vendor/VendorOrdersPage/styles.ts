import { Grid } from '@mui/material';
import { styled } from '@mui/system';

const SectionWrapper = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '10px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
}));

export default SectionWrapper;
