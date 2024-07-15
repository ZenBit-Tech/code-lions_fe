import { useTranslation } from 'react-i18next';

import { Box, Typography, Button, List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';

import TickGreyIcon from 'src/assets/icons/tick-grey.svg';
import TickWhiteIcon from 'src/assets/icons/tick-white.svg';
import { productStyles, maxProductPrice, colors } from 'src/common/constants';
import { IProductFilters } from 'src/redux/product/types';
import theme from 'src/theme';

import PriceFilter from './PriceFilter';
import { style } from './styles';

interface IProductFilterProps {
  filters: IProductFilters;
  onFilterChange: (filters: IProductFilters) => void;
}

const whiteColor = 'white';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const styles = Object.values(productStyles);

function ProductFilters({ filters, onFilterChange }: IProductFilterProps) {
  const { t } = useTranslation();

  const handlePriceChange = (min: number, max: number) => {
    const newFilters = { ...filters };

    if (min !== 0) {
      newFilters.minPrice = min;
    }
    if (max !== maxProductPrice) {
      newFilters.maxPrice = max;
    }
    onFilterChange(newFilters);
  };

  const handleFilterChange = (key: keyof IProductFilters, value: string) => {
    let newFilters = { ...filters };

    if (value === filters[key]) {
      delete newFilters[key];
    } else {
      newFilters = { ...newFilters, [key]: value };
    }

    onFilterChange(newFilters);
  };

  return (
    <Box sx={{ width: '310px', padding: '24px' }}>
      <Typography
        variant="h2"
        sx={{ marginBottom: '32px', textAlign: 'center' }}
      >
        {t('filters.title')}
      </Typography>
      <Typography variant="h2" sx={style.subTitle}>
        {t('filters.price')}
      </Typography>
      <Box sx={{ width: 262 }}>
        <Box>
          <PriceFilter
            onPriceChange={handlePriceChange}
            minPrice={filters.minPrice || 0}
            maxPrice={filters.maxPrice || maxProductPrice}
          />
        </Box>
      </Box>
      <Box sx={{ mt: '40px', maxWidth: '100%' }}>
        <Typography variant="h2" sx={style.subTitle}>
          {t('filters.color')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {colors.map((color) => (
            <Box
              key={color.name}
              onClick={() => handleFilterChange('color', color.name)}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                sx={{
                  width: '34px',
                  height: '34px',
                  backgroundColor: color.hex,
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow:
                    color.name === filters.color
                      ? `0 2px 8px 0 ${theme.palette.common.black}`
                      : theme.shadows[2],
                  transition: 'box-shadow 0.3s linear',
                  '&:hover': {
                    boxShadow: `0 2px 8px 0 ${theme.palette.common.black}`,
                  },
                  '&:focus': {
                    boxShadow: `0 2px 8px 0 ${theme.palette.common.black}`,
                  },
                }}
              >
                <Box
                  sx={{
                    display: color.name === filters.color ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  {color.name === whiteColor ? (
                    <TickGreyIcon />
                  ) : (
                    <TickWhiteIcon />
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: '40px', maxWidth: '100%' }}>
        <Typography variant="h2" sx={style.subTitle}>
          {t('filters.size')}
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {sizes.map((size) => (
            <Button
              key={size}
              variant={size === filters.size ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange('size', size)}
              sx={{
                minWidth: '34px',
                border: '0.75px, solid',
                borderRadius: '6px',
                borderColor: theme.palette.grey[200],
                padding: '8px',
                fontSize: '11px',
              }}
            >
              {size}
            </Button>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: '40px' }}>
        <Typography variant="h2" sx={style.subTitle}>
          {t('filters.style')}
        </Typography>
        <List
          sx={{
            width: '100%',
            marginBottom: '20px',
            height: '123px',
            overflow: 'auto',
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {styles.map((productStyle) => (
            <ListItemButton
              key={productStyle}
              selected={productStyle === filters.style}
              onClick={() => handleFilterChange('style', productStyle)}
            >
              <Box
                component="span"
                sx={{
                  color:
                    productStyle === filters.style
                      ? theme.palette.common.black
                      : theme.palette.text.disabled,
                  fontWeight: theme.typography.h4.fontWeight,
                  lineHeight: 1.57,
                  '&::first-letter': {
                    textTransform: 'uppercase',
                  },
                }}
              >
                {productStyle}
              </Box>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default ProductFilters;
