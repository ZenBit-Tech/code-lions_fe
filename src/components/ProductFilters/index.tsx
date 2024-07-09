import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import checkImg from 'src/assets/photos/check-filters.png';
import { productStyles } from 'src/common/constants';
import theme from 'src/theme';

import { CustomizedSlider } from './styles';

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

const styles = Object.values(productStyles);
const sizes = ['XS', 'S', 'M', 'L', 'XL'];

function ProductFilters() {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number>(min);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setPrice(newValue as number);
  };

  const handleToggle = (style: string) => {
    const currentIndex = selectedStyles.indexOf(style);
    const newChecked = [...selectedStyles];
    const absent = -1;

    if (currentIndex === absent) {
      newChecked.push(style);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedStyles(newChecked);
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
        <Box sx={{ display: 'flex', gap: '14px' }}>
          {colors.map((color) => (
            <Box
              key={color.name}
              onClick={() => setSelectedColor(color.name)}
              sx={{ cursor: 'pointer' }}
            >
              {color.name === selectedColor ? (
                <img src={checkImg} alt="check" />
              ) : (
                <Box
                  sx={{
                    width: '34px',
                    height: '34px',
                    backgroundColor: color.hex,
                    borderRadius: '50%',
                    display: 'inline-block',
                    transition: 'box-shadow 0.3s linear',
                    '&:hover': {
                      boxShadow: `0 2px 8px 0 ${theme.palette.common.black}`,
                    },
                    '&:focus': {
                      boxShadow: `0 2px 8px 0 ${theme.palette.common.black}`,
                    },
                  }}
                />
              )}
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
        <List>
          {styles.map((style) => (
            <ListItem key={style} onClick={() => handleToggle(style)}>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: selectedStyles.includes(style)
                        ? 'bold'
                        : 'normal',
                    }}
                  >
                    {style}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default ProductFilters;
