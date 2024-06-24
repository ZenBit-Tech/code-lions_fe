import { Controller } from 'react-hook-form';

import { MenuItem, Select } from '@mui/material';

import ChevronDown from 'src/assets/icons/chevron-down.svg';
import { countryCodes } from 'src/common/constants';
import theme from 'src/theme';

import {
  StyledFormControl,
  StyledPhoneInput,
  StyledPhoneWrapper,
} from './styles';
import { IPhoneInputProps } from './types';

function PhoneInput({ control, name }: IPhoneInputProps) {
  return (
    <StyledPhoneWrapper>
      <Controller
        name={`${name}.countryCode` as const}
        control={control}
        render={({ field: { onChange, value } }) => (
          <StyledFormControl>
            <Select
              onChange={onChange}
              value={value ?? ''}
              variant="outlined"
              size="small"
              IconComponent={(props) => <ChevronDown {...props} />}
              sx={{
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                backgroundColor: theme.palette.secondary.main,
                '.MuiSelect-select': {
                  padding: '3px 6px',
                  borderRadius: '6px',
                },
                '.MuiSelect-icon': {
                  width: '20px',
                  height: '20px',
                  top: 4,
                },
              }}
            >
              {countryCodes.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.code}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        )}
      />
      <Controller
        name={`${name}.phoneNumber` as const}
        control={control}
        render={({ field: { onChange, value } }) => (
          <StyledPhoneInput onChange={onChange} value={value ?? ''} fullWidth />
        )}
      />
    </StyledPhoneWrapper>
  );
}

export default PhoneInput;
