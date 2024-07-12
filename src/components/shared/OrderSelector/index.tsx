import { useTranslation } from 'react-i18next';

import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

import theme from 'src/theme';

export type SortParameter = 'price' | 'name' | 'createdAt';
export type SortOrder = 'ASC' | 'DESC';

interface SortProps {
  sortBy?: SortParameter;
  sortOrder?: SortOrder;
  onSortChange: (sortBy?: SortParameter, sortOrder?: SortOrder) => void;
}

const options = [
  { value: 'none', labelKey: 'orderSelect.noSort' },
  {
    value: 'price:ASC',
    labelKey: 'orderSelect.price',
    orderKey: 'orderSelect.ascending',
  },
  {
    value: 'price:DESC',
    labelKey: 'orderSelect.price',
    orderKey: 'orderSelect.descending',
  },
  {
    value: 'createdAt:ASC',
    labelKey: 'orderSelect.date',
    orderKey: 'orderSelect.ascending',
  },
  {
    value: 'createdAt:DESC',
    labelKey: 'orderSelect.date',
    orderKey: 'orderSelect.descending',
  },
  {
    value: 'name:ASC',
    labelKey: 'orderSelect.name',
    orderKey: 'orderSelect.ascending',
  },
  {
    value: 'name:DESC',
    labelKey: 'orderSelect.name',
    orderKey: 'orderSelect.descending',
  },
];

function OrderSelector({ sortBy, sortOrder, onSortChange }: SortProps) {
  const { t } = useTranslation();

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const newSortBy =
      value === 'none' ? undefined : (value.split(':')[0] as SortParameter);
    const newSortOrder =
      value === 'none' ? undefined : (value.split(':')[1] as SortOrder);

    onSortChange(newSortBy, newSortOrder);
  };

  return (
    <FormControl sx={{ width: '220px' }}>
      <Select
        value={sortBy ? `${sortBy}:${sortOrder}` : 'none'}
        onChange={handleSortChange}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.border.primary,
          },
          '& .MuiSelect-icon': {
            color: theme.palette.primary.main,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
          borderRadius: '6px',
          padding: '0 8px',
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.h4.fontSize,
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root': {
                fontSize: theme.typography.h4.fontSize,
              },
            },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.orderKey
              ? `${t(opt.labelKey)} - ${t(opt.orderKey)}`
              : t(opt.labelKey)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default OrderSelector;
