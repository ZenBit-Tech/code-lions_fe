import { styled } from '@mui/system';
import { IconButton } from '@mui/material';

const ArrowButton = styled(IconButton)(({ theme }) => ({
  padding: '18px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  '&:hover, &:active, &:focus': {
    backgroundColor: theme.palette.primary.main,
  },
  '&:hover': {
    opacity: theme.palette.action.hoverOpacity,
  },
}));

export default ArrowButton;
