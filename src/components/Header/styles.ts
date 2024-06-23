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

export default SvgHover;
