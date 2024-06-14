import { Box, styled } from '@mui/system';

import theme from 'src/theme';

const StyledAvatar = styled(Box)({
  backgroundColor: theme.palette.border.primary,
  padding: '10px',
  borderRadius: '50%',
  marginRight: '10px',
  marginLeft: '20px',
});

export default StyledAvatar;
