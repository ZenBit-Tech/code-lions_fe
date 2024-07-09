import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography, Button, List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';

import TickGreyIcon from 'src/assets/icons/tick-grey.svg';
import TickWhiteIcon from 'src/assets/icons/tick-white.svg';
import { productStyles, maxProductPrice } from 'src/common/constants';
import StyledButton from 'src/components/shared/StyledButton';
import {
  PaddingVariants,
  StyleVariants,
} from 'src/components/shared/StyledButton/types';
import theme from 'src/theme';

import PriceFilter from './PriceFilter';
import { style } from './styles';

const colors = [
  { name: 'black', hex: '#000000' },
  { name: 'red', hex: '#EB5757' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'green', hex: '#008000' },
  { name: 'pink', hex: '#F178B6' },
  { name: 'yellow', hex: '#F2C94C' },
  { name: 'purple', hex: '#7879F1' },
  { name: 'blue', hex: '#6aa9dd' },
  { name: 'grey', hex: '#6D6B6B' },
  { name: 'orange', hex: '#ED6C3C' },
];
const white = 'white';

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const styles = Object.values(productStyles);

function ProductFilters() {
  const { t } = useTranslation();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(maxProductPrice);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleApplyFilters = () => {
    // TODO: connect with backend
  };

  const handleClearFilters = (): void => {
    setMinPrice(0);
    setMaxPrice(maxProductPrice);
    setSelectedColor('');
    setSelectedSize('');
    setSelectedStyle('');
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
            minPrice={minPrice}
            maxPrice={maxPrice}
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
              onClick={() => setSelectedColor(color.name)}
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
                    color.name === selectedColor
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
                    display: color.name === selectedColor ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  {color.name === white ? <TickGreyIcon /> : <TickWhiteIcon />}
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
              variant={size === selectedSize ? 'contained' : 'outlined'}
              onClick={() => setSelectedSize(size)}
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
              selected={productStyle === selectedStyle}
              onClick={() => setSelectedStyle(productStyle)}
            >
              <Box
                component="span"
                sx={{
                  color:
                    productStyle === selectedStyle
                      ? theme.palette.common.black
                      : theme.palette.text.disabled,
                  fontWeight: 500,
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
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <StyledButton
            onClick={handleApplyFilters}
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.MD}
            fontSize={String(theme.typography.h4.fontSize)}
            radius="8px"
          >
            {t('filters.apply')}
          </StyledButton>
          <StyledButton
            onClick={handleClearFilters}
            styles={StyleVariants.BLACK}
            padding={PaddingVariants.MD}
            fontSize={String(theme.typography.h4.fontSize)}
            radius="8px"
          >
            {t('filters.clear')}
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductFilters;
