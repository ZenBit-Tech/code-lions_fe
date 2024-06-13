import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import ArrowDown from 'src/assets/icons/arrow-down.svg';
import theme from 'src/theme';

function TopBar() {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      width="100%"
      height="70px"
      sx={{ borderLeft: `1px solid ${theme.palette.background.paper}` }}
    >
      <Box
        padding="15px 24px"
        width="174px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <Typography>AA</Typography>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="subtitle1"
              sx={{ fontSize: '16px', marginBottom: '4px' }}
            >
              Anna Asol
            </Typography>
            <Typography
              variant="overline"
              sx={{ color: theme.palette.text.disabled }}
            >
              Admin
            </Typography>
          </Box>
        </Box>
        <ArrowDown />
      </Box>
    </Box>
  );
}

export default TopBar;
