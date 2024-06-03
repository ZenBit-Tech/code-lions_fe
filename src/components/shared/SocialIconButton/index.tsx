import { IconButton } from '@mui/material';
import { styled } from '@mui/system';
import theme from 'src/theme';

const SocialIconButton = styled(IconButton)({
  height: '44px',
  width: '100%',
  color: theme.palette.common.black,
  padding: '10px 34px',
  border: `1px solid ${theme.palette.border.secondary}`,
  borderRadius: '6px',
  cursor: 'pointer',
});

export default SocialIconButton;
