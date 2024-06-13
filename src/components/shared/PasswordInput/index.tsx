import React, { useState, forwardRef } from 'react';

import { IconButton, InputAdornment } from '@mui/material';

import CustomHiddenIcon from 'src/assets/icons/eye-closed.svg';
import CustomVisibleIcon from 'src/assets/icons/eye.svg';
import { StyledInputProps } from 'src/components/shared/StyledInput/types';

import StyledPasswordInput from './styledPasswordInput';

const PasswordInput = forwardRef<HTMLInputElement, StyledInputProps>(
  ({ placeholder, width, padding, name, stylevariant, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    return (
      <StyledPasswordInput
        {...props}
        id={`outlined-adornment-${name}`}
        type={showPassword ? 'text' : 'password'}
        ref={ref}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <CustomHiddenIcon /> : <CustomVisibleIcon />}
            </IconButton>
          </InputAdornment>
        }
        placeholder={placeholder}
        width={width}
        padding={padding}
        stylevariant={stylevariant}
      />
    );
  }
);

export default PasswordInput;
