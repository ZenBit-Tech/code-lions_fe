import { RadioGroup } from '@mui/material';
import { Box, styled } from '@mui/system';

export const FormWrapper = styled(RadioGroup)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const ShippingOption = styled(Box)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.grey[200]}`,
    padding: '13px 16px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })
);
