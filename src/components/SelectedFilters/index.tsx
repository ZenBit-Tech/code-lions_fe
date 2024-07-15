import { useTranslation } from 'react-i18next';

import { Box, Chip } from '@mui/material';

import capitalizeAndTruncate from 'src/common/utils/capitalizeAndTruncate';
import { IProductFilters } from 'src/redux/product/types';
import theme from 'src/theme';

const clear = 'clear';

type SelectedFiltersProps = {
  filters: IProductFilters;
  onResetFilter: (option: keyof IProductFilters) => void;
  onResetAllFilters: () => void;
};

type filterKeys = keyof IProductFilters | typeof clear;

function SelectedFilters({
  filters,
  onResetFilter,
  onResetAllFilters,
}: SelectedFiltersProps) {
  const { t } = useTranslation();

  const filtersData = [];

  if (filters.color) {
    filtersData.push({ key: 'color', label: t(`colors.${filters.color}`) });
  }
  if (filters.style) {
    filtersData.push({
      key: 'style',
      label: capitalizeAndTruncate(filters.style),
    });
  }
  if (filters.size) {
    filtersData.push({ key: 'size', label: filters.size });
  }
  if (filters.minPrice) {
    filtersData.push({
      key: 'minPrice',
      label: `${t('selectedFilters.from')} $${filters.minPrice}`,
    });
  }
  if (filters.maxPrice) {
    filtersData.push({
      key: 'maxPrice',
      label: `${t('selectedFilters.to')}  $${filters.maxPrice}`,
    });
  }

  if (filtersData.length !== 0) {
    filtersData.push({ key: clear, label: t('selectedFilters.clearAll') });
  }

  const handleDelete = (key: keyof IProductFilters | typeof clear): void => {
    if (key === clear) {
      onResetAllFilters();
    } else {
      onResetFilter(key);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {filtersData.map((filter) => (
        <Chip
          sx={{
            background: '#f5f5f5',
            borderRadius: '4px',
            borderColor: theme.palette.border.secondary,
            padding: '2px 6px',
            fontFamily: theme.typography.fontFamily,
            fontWeight: theme.typography.h2.fontSynthesisWeight,
            fontSize: theme.typography.caption.fontSize,
            lineHeight: '167%',
            color: theme.palette.grey[800],
          }}
          key={filter.key}
          label={filter.label}
          onDelete={() => handleDelete(filter.key as filterKeys)}
          variant="outlined"
        />
      ))}
    </Box>
  );
}

export default SelectedFilters;
