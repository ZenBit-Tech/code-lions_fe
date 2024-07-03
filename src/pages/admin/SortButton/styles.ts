import { IconButton, Typography } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Box, styled } from '@mui/system';

export const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  borderRadius: '10px',
  padding: '12px 17px',
}));

export const ButtonTitle = styled(Typography)(
  ({ theme }: { theme: Theme }) => ({
    fontWeight: theme.typography.bold.fontWeight,
    color: theme.palette.text.primary,
    marginRight: '27px',
  })
);

export const SortIconWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
