import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Slider,
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';

import theme from 'src/theme';

import { ColorButton } from './styles';

const min = 0;
const max = 80;

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
  { name: 'violet', hex: '#7879F1' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const styles = ['Style 1', 'Style 2', 'Style 3'];

function ProductFilters() {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number>(min);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<string>(styles[0]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
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
        <Slider
          marks={marks}
          value={price}
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
            onClick={() => setPrice(min)}
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
            onClick={() => setPrice(max)}
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
            <ColorButton
              key={color.name}
              selected={color.name === selectedColor}
              buttoncolor={color.hex}
              onClick={() => setSelectedColor(color.name)}
            >
              {}
            </ColorButton>
          ))}
        </Box>
      </Box>
      <Box sx={{ mt: '40px', maxWidth: '100%' }}>
        <Typography variant="h2" sx={{ mb: '24px' }}>
          {t('filters.size')}{' '}
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {sizes.map((size) => (
            <Button
              key={size}
              variant={size === selectedSize ? 'contained' : 'outlined'}
              onClick={() => setSelectedSize(size)}
              sx={{
                border: '0.75px, solid',
                borderRadius: '6px',
                borderColor: theme.palette.grey[200],
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
        <Select
          value={selectedStyle}
          onChange={(e: SelectChangeEvent) => setSelectedStyle(e.target.value)}
          fullWidth
        >
          {styles.map((style) => (
            <MenuItem key={style} value={style}>
              {style}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
}

export default ProductFilters;
