import { Typography } from '@mui/material';
import { Box, BoxProps } from '@mui/system';

import CheckMediumIcon from 'src/assets/icons/check-medium.svg';
import theme from 'src/theme';

interface OnboardingHeaderItemProps extends BoxProps {
  stepId: number;
  title: string;
  finished?: boolean;
  active?: boolean;
}

const digitsInNumber = 2;

function OnboardingHeaderItem({
  stepId,
  title,
  finished,
  active,
}: OnboardingHeaderItemProps) {
  const containerProperties: BoxProps = {
    bgcolor: theme.palette.background.default,
  };
  const numberProperties: BoxProps = {};

  if (finished) {
    containerProperties.bgcolor = theme.palette.secondary.main;
    numberProperties.bgcolor = theme.palette.common.black;
  }

  if (active) {
    containerProperties.bgcolor = theme.palette.secondary.main;
  }

  return (
    <Box
      component="li"
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        borderRadius: '8px 8px 0 0',
        height: '72px',
        pl: '24px',
        ...containerProperties,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          border: `2px solid ${active || finished ? theme.palette.common.black : theme.palette.primary.light}`,
          borderRadius: '50%',
          ...numberProperties,
        }}
      >
        {finished ? (
          <CheckMediumIcon />
        ) : (
          <Typography variant="h4" component="div">
            {stepId.toString().padStart(digitsInNumber, '0')}
          </Typography>
        )}
      </Box>
      <Typography variant="h4" sx={{ letterSpacing: '0' }}>
        {title}
      </Typography>
    </Box>
  );
}

export default OnboardingHeaderItem;
