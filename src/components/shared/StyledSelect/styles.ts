import { Select, SelectProps, styled } from '@mui/material';

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  width: '100%',
  '&.MuiOutlinedInput-root': {
    borderRadius: '6px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '6px',
  },
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    color: theme.palette.text.primary,
    padding: '12px 16px',
    height: '48px',
    boxSizing: 'border-box',
  },
}));

export default StyledSelect;
