import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import ChevronDown from 'src/assets/icons/chevron-down.svg';
import { countryCodes } from 'src/common/constants';
import theme from 'src/theme';

import {
  StyledFormControl,
  StyledPhoneInput,
  StyledPhoneWrapper,
} from './styles';

function PhoneInput() {
  const { t } = useTranslation();
  const [countryCode, setCountryCode] = useState<string>(countryCodes[0].code);
  const [phoneNumber, setPhoneNumber] = useState<string>(
    t('userProfileAdmin.mockPhoneNumber')
  );

  const handleCountryCodeChange = (event: SelectChangeEvent<string>) => {
    setCountryCode(event.target.value as string);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <StyledPhoneWrapper>
      <StyledFormControl>
        <Select
          variant="outlined"
          value={countryCode}
          onChange={handleCountryCodeChange}
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
      <StyledPhoneInput
        defaultValue={phoneNumber}
        onChange={handlePhoneNumberChange}
        fullWidth
      />
    </StyledPhoneWrapper>
  );
}

export default PhoneInput;
