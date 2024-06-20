import { useTranslation } from 'react-i18next';

import { InputAdornment } from '@mui/material';

import SearchIcon from 'src/assets/icons/search.svg';

import TextFieldStyled from './styles';

function SearchInput() {
  const { t } = useTranslation();

  return (
    <TextFieldStyled
      fullWidth
      variant="outlined"
      id="input-with-icon-textfield"
      placeholder={t('usersAdmin.searchInput')}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchInput;
