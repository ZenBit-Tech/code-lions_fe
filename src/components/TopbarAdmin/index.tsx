import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import ChevronDown from 'src/assets/icons/chevron-down-grey.svg';
import theme from 'src/theme';

import StyledAvatar from './styles';

function TopBar() {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      padding="15px 24px"
      width="100%"
      height="70px"
      sx={{ borderLeft: `1px solid ${theme.palette.background.paper}` }}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        sx={{
          borderLeft: `1px solid ${theme.palette.background.paper}`,
          width: '200px',
        }}
      >
        <Box display="flex" alignItems="center">
          <StyledAvatar>
            <Typography color={theme.palette.common.white}>
              {t('topbar.mockAvatar')}
            </Typography>
          </StyledAvatar>
          <Box display="flex" flexDirection="column" marginRight="30px">
            <Typography
              variant="subtitle1"
              sx={{ fontSize: '16px', marginBottom: '4px' }}
            >
              {t('topbar.mockName')}
            </Typography>
            <Typography
              variant="overline"
              sx={{ color: theme.palette.text.disabled }}
            >
              {t('topbar.mockRole')}
            </Typography>
          </Box>
        </Box>
        <ChevronDown />
      </Box>
    </Box>
  );
}

export default TopBar;
