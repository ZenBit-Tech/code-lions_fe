import React, { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import { StyledInputProps } from 'src/components/shared/StyledInput/types';
import CustomVisibleIcon from 'src/assets/icons/eye.svg';
import CustomHiddenIcon from 'src/assets/icons/eye-closed.svg';
import StyledPasswordInput from './styledPasswordInput';

function PasswordInput({
  placeholder,
  width,
  padding,
  name,
  borderRadius,
  stylevariant,
}: StyledInputProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <StyledPasswordInput
      id={`outlined-adornment-${name}`}
      type={showPassword ? 'text' : 'password'}
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
      borderRadius={borderRadius}
      stylevariant={stylevariant}
    />
  );
}

export default PasswordInput;
