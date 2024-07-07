import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography, Button, List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';

import {
  setColorFilter,
  setPriceFilter,
  setSizeFilter,
  setStyleFilter,
} from 'src/redux/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import theme from 'src/theme';

import StyledButton from '../shared/StyledButton';

import { CustomizedSlider } from './styles';

const min = 0;
const max = 1000;

const marks = [
  {
    value: min,
    label: '',
  },
  {
    value: max,
    label: '',
  },
];

const colors = [
  { name: 'green', hex: '#008000' },
  { name: 'pink', hex: '#F178B6' },
  { name: 'yellow', hex: '#F2C94C' },
  { name: 'red', hex: '#EB5757' },
  { name: 'purple', hex: '#7879F1' },
  { name: 'black', hex: '#000000' },
  { name: 'blue', hex: '#6aa9dd' },
  { name: 'brown', hex: 'rgba(170, 66, 88, 0.3)' },
  { name: 'grey', hex: '#6D6B6B' },
  { name: 'orange', hex: '#ED6C3C' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const styles = ['Casual', 'Premium', 'Fancy'];

function ProductFilters() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const price = useAppSelector((state) => state.filters.selectedPrice);
  const selectedColor = useAppSelector((state) => state.filters.selectedColor);
  const selectedSize = useAppSelector((state) => state.filters.selectedSize);
  const selectedStyle = useAppSelector((state) => state.filters.selectedStyle);

  const [localPrice, setLocalPrice] = useState(price);
  const [localColor, setLocalColor] = useState(selectedColor);
  const [localSize, setLocalSize] = useState(selectedSize);
  const [localStyle, setLocalStyle] = useState(selectedStyle);

  const handleChange = (_: Event, newValue: number | number[]): void => {
    setLocalPrice(newValue as number);
  };

  const handleApplyFilters = (): void => {
    dispatch(setPriceFilter(localPrice));
    dispatch(setColorFilter(localColor));
    dispatch(setSizeFilter(localSize));
    dispatch(setStyleFilter(localStyle));
  };

  const handleClearFilters = (): void => {
    setLocalPrice(min);
    setLocalColor('');
    setLocalSize('');
    setLocalStyle('');

    dispatch(setPriceFilter(min));
    dispatch(setColorFilter(''));
    dispatch(setSizeFilter(''));
    dispatch(setStyleFilter(''));
  };

  return (
    <Box sx={{ width: '310px', padding: '24px' }}>
      <Typography variant="h2" sx={{ marginBottom: '32px' }}>
        {t('filters.title')}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: '24px' }}>
        {t('filters.price')}
      </Typography>
      <Box sx={{ width: 262 }}>
        <CustomizedSlider
          marks={marks}
          step={5}
          value={localPrice}
          valueLabelDisplay="auto"
          min={min}
          max={max}
          onChange={handleChange}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <Typography
            variant="body2"
            onClick={() => setLocalPrice(min)}
            sx={{
              cursor: 'pointer',
              paddingTop: '6px',
              paddingBottom: '6px',
              paddingLeft: '35px',
              paddingRight: '35px',
              border: '0.75px, solid',
              borderRadius: '6px',
              borderColor: theme.palette.grey[200],
            }}
          >
            {min} {t('filters.dollar')}
          </Typography>
          <Typography
            variant="body2"
            onClick={() => setLocalPrice(max)}
            sx={{
              cursor: 'pointer',
              paddingTop: '6px',
              paddingBottom: '6px',
              paddingLeft: '35px',
              paddingRight: '35px',
              border: '0.75px, solid',
              borderRadius: '6px',
              borderColor: theme.palette.grey[200],
            }}
          >
            {max} {t('filters.dollar')}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mt: '40px', maxWidth: '100%' }}>
        <Typography variant="h2" sx={{ mb: '24px' }}>
          {t('filters.color')}
        </Typography>
        <Box sx={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          {colors.map((color) => (
            <Box
              key={color.name}
              onClick={() => setLocalColor(color.name)}
              sx={{ cursor: 'pointer' }}
            >
              <Box
                sx={{
                  width: '34px',
                  height: '34px',
                  backgroundColor: color.hex,
                  borderRadius: '50%',
                  display: 'inline-block',
                  boxShadow:
                    color.name === localColor
                      ? `0 2px 8px 0 ${theme.palette.common.black}`
                      : 'none',
                  transition: 'box-shadow 0.3s linear',
                  '&:hover': {
                    boxShadow: `0 2px 8px 0 ${theme.palette.common.black}`,
                  },
                  '&:focus': {
                    boxShadow: `0 2px 8px 0 ${theme.palette.common.black}`,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: '40px', maxWidth: '100%' }}>
        <Typography variant="h2" sx={{ mb: '24px' }}>
          {t('filters.size')}{' '}
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          {sizes.map((size) => (
            <Button
              key={size}
              variant={size === localSize ? 'contained' : 'outlined'}
              onClick={() => setLocalSize(size)}
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
        <Typography variant="h2" sx={{ mb: '16px' }}>
          {t('filters.style')}
        </Typography>
        <List
          sx={{
            width: '100%',
            marginBottom: '40px',
            maxHeight: '123px',
            overflow: 'auto',
            paddingTop: 0,
            paddingBottom: 0,
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.scroll.lightGrey,
            },
            '&::-webkit-scrollbar-thumb': {
              background: theme.palette.scroll.darkGrey,
              borderRadius: '28px',
            },
          }}
        >
          {styles.map((style) => (
            <ListItemButton
              key={style}
              selected={style === localStyle}
              onClick={() => setLocalStyle(style)}
              sx={{
                color: theme.palette.text.disabled,
                fontWeight: 500,
                lineHeight: 1.57,
              }}
            >
              {style}
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledButton
            onClick={handleApplyFilters}
            sx={{
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingLeft: '35px',
              paddingRight: '35px',
              borderRadius: '6px',
            }}
          >
            {t('filters.apply')}
          </StyledButton>
          <StyledButton
            onClick={handleClearFilters}
            sx={{
              paddingTop: '10px',
              paddingBottom: '10px',
              paddingLeft: '35px',
              paddingRight: '35px',
              borderRadius: '6px',
            }}
          >
            {t('filters.clear')}
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductFilters;
