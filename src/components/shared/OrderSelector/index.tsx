import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

import theme from 'src/theme';

type SortParameter = 'price' | 'name' | 'date';
type SortOrder = 'asc' | 'desc';

interface SortProps {
  onSortChange: (sortBy?: SortParameter, sortOrder?: SortOrder) => void;
}

function OrderSelector({ onSortChange }: SortProps) {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState<SortParameter | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder | undefined>(undefined);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const { value } = event.target;
    const newSortBy =
      value === 'none' ? undefined : (value.split(':')[0] as SortParameter);
    const newSortOrder =
      value === 'none' ? undefined : (value.split(':')[1] as SortOrder);

    onSortChange(newSortBy, newSortOrder);
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <FormControl sx={{ width: '220px' }}>
      <Select
        value={sortBy && sortOrder ? `${sortBy}:${sortOrder}` : 'none'}
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
      >
        <MenuItem value="none">{t('orderSelect.noSort')}</MenuItem>
        <MenuItem value="price:asc">
          {t('orderSelect.price')} - {t('orderSelect.ascending')}
        </MenuItem>
        <MenuItem value="price:desc">
          {t('orderSelect.price')} - {t('orderSelect.descending')}
        </MenuItem>
        <MenuItem value="date:asc">
          {t('orderSelect.date')} - {t('orderSelect.ascending')}
        </MenuItem>
        <MenuItem value="date:desc">
          {t('orderSelect.date')} - {t('orderSelect.descending')}
        </MenuItem>
        <MenuItem value="name:asc">
          {t('orderSelect.name')} - {t('orderSelect.ascending')}
        </MenuItem>
        <MenuItem value="name:desc">
          {t('orderSelect.name')} - {t('orderSelect.descending')}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default OrderSelector;
