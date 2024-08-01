import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const SvgHover = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  '&:hover svg': {
    filter:
      'invert(43%) sepia(29%) saturate(26%) hue-rotate(314deg) brightness(87%) contrast(77%)',
  },
}));

const UnreadMessages = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  margin: '0 0.5rem',
  borderRadius: '50%',
  paddingBottom: '0.15rem',
  width: '1.5rem',
  height: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export { UnreadMessages, SvgHover };
