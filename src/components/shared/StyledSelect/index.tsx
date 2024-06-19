import { useTranslation } from 'react-i18next';

import { MenuItem, SelectProps } from '@mui/material';

import theme from 'src/theme';

import StyledSelect from './styles';

export interface ISelectOptions {
  options: { label: string; value: string }[];
}
type TCustomSelect = ISelectOptions & Pick<SelectProps, keyof SelectProps>;

export function CustomSelect(props: TCustomSelect) {
  const { value, label, onChange, fullWidth, options, ...rest } = props;
  const { t } = useTranslation();

  return (
    <StyledSelect
      MenuProps={{
        sx: {
          '& .MuiMenuItem-root': {
            padding: '12px 16px',
            borderRadius: '6px',
          },
          '& .MuiMenu-paper': {
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.border.primary}`,
            borderRadius: '6px',
            boxShadow: theme.shadows[1],
          },
          '& .MuiMenuItem-root:hover': {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.common.black,
          },
          '& .Mui-selected': {
            color: theme.palette.text.primary,
            borderRadius: '6px',
          },
        },
      }}
      sx={{
        color: theme.palette.common.black,
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'theme.palette.primary.main',
        },
      }}
      fullWidth={fullWidth}
      label={label}
      value={value}
      onChange={onChange}
      displayEmpty
      {...rest}
    >
      {options?.length > 0 ? (
        options.map((opt, index) => (
          <MenuItem
            key={index}
            value={opt.value}
            selected={opt.value === value}
          >
            {opt.label}
          </MenuItem>
        ))
      ) : (
        <MenuItem>{t('no_data')}</MenuItem>
      )}
    </StyledSelect>
  );
}
