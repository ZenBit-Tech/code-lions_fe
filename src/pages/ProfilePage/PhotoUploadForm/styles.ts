import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

export const AvatarBackdrop = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[200],
}));

export const AvatarPreview = styled(Avatar)({
  position: 'absolute',
  width: '120px',
  height: '120px',
  borderRadius: '50%',
});

export const VisuallyHiddenInput = styled('input')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});
