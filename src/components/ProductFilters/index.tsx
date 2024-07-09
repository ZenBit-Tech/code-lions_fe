import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Typography, Button, List } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';

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
  const [selectedPrice, setSelectedPrice] = useState<number>(min);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>('');

  const handleChange = (_: Event, newValue: number | number[]): void => {
    setSelectedPrice(newValue as number);
  };

  const handleApplyFilters = () => {
    // TODO: connect with backend
  };

  const handleClearFilters = (): void => {
    setSelectedPrice(min);
    setSelectedColor('');
    setSelectedSize('');
    setSelectedStyle('');
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
          value={selectedPrice}
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
            onClick={() => setSelectedPrice(min)}
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
            onClick={() => setSelectedPrice(max)}
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
              onClick={() => setSelectedColor(color.name)}
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
                    color.name === selectedColor
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
        <Typography variant="h2" sx={{ mb: '16px' }}>
          {t('filters.style')}
        </Typography>
        <List
          sx={{
            width: '100%',
            marginBottom: '40px',
            height: '123px',
            overflow: 'auto',
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {styles.map((style) => (
            <ListItemButton
              key={style}
              selected={style === selectedStyle}
              onClick={() => setSelectedStyle(style)}
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
              paddingTop: '15px',
              paddingBottom: '15px',
              paddingLeft: '40px',
              paddingRight: '40px',
              borderRadius: '6px',
            }}
          >
            {t('filters.apply')}
          </StyledButton>
          <StyledButton
            onClick={handleClearFilters}
            sx={{
              paddingTop: '15px',
              paddingBottom: '15px',
              paddingLeft: '40px',
              paddingRight: '40px',
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
