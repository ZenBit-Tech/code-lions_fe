import { Paper } from '@mui/material';
import { styled } from '@mui/system';

export const ImageWrapper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: '14px',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  width: '80px',
  height: '96px',
}));

export const Image = styled('img')({
  objectFit: 'cover',
  objectPosition: 'center',
});
