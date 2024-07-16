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

interface Options {
  value: string;
  label: string;
  sortBy?: SortParameter;
  sortOrder?: SortOrder;
}

const options: Options[] = [
  { value: 'none', label: 'orderSelect.noSort' },
  {
    value: 'price:ASC',
    label: 'orderSelect.priceAsc',
    sortBy: 'price',
    sortOrder: 'ASC',
  },
  {
    value: 'price:DESC',
    label: 'orderSelect.priceDesc',
    sortBy: 'price',
    sortOrder: 'DESC',
  },
  {
    value: 'createdAt:ASC',
    label: 'orderSelect.dateAsc',
    sortBy: 'createdAt',
    sortOrder: 'ASC',
  },
  {
    value: 'createdAt:DESC',
    label: 'orderSelect.dateDesc',
    sortBy: 'createdAt',
    sortOrder: 'DESC',
  },
  {
    value: 'name:ASC',
    label: 'orderSelect.nameAsc',
    sortBy: 'name',
    sortOrder: 'ASC',
  },
  {
    value: 'name:DESC',
    label: 'orderSelect.nameDesc',
    sortBy: 'name',
    sortOrder: 'DESC',
  },
];

function OrderSelector({ sortBy, sortOrder, onSortChange }: SortProps) {
  const { t } = useTranslation();

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const selectedOption = options.filter(
      (option) => option.value === value
    )[0];
    const { sortBy: newSortBy, sortOrder: newSortOrder } = selectedOption;

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
            {t(opt.label)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default OrderSelector;
