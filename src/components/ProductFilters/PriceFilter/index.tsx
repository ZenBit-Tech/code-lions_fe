import React from 'react';

import { Box } from '@mui/material';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { maxProductPrice } from 'src/common/constants';

import './styles.css';
import StyledInput from './styles';

function PriceFilter({
  onPriceChange,
  minPrice,
  maxPrice,
}: {
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  minPrice: number;
  maxPrice: number;
}) {
  const handleSliderChange = (values: number[]) => {
    onPriceChange(values[0], values[1]);
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(
      Math.max(0, parseInt(e.target.value, 10)),
      maxPrice
    );

    onPriceChange(newValue, maxPrice);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(
      minPrice,
      Math.min(maxProductPrice, parseInt(e.target.value, 10))
    );

    onPriceChange(minPrice, newValue);
  };

  return (
    <Box className="slider">
      <Slider
        range
        min={0}
        max={maxProductPrice}
        allowCross={false}
        value={[minPrice, maxPrice]}
        onChange={(values: number | number[]) => {
          if (Array.isArray(values)) {
            const [newMinValue, newMaxValue] = values;

            handleSliderChange([newMinValue, newMaxValue]);
          }
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10%',
          marginTop: '24px',
        }}
      >
        <StyledInput
          type="number"
          value={minPrice}
          onChange={handleMinInputChange}
        />
        <StyledInput
          type="number"
          value={maxPrice}
          onChange={handleMaxInputChange}
        />
      </Box>
    </Box>
  );
}

export default PriceFilter;
