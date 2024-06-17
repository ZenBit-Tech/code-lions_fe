import { InputAdornment } from '@mui/material';

import SearchIcon from 'src/assets/icons/search.svg';

import TextFieldStyled from './styles';

function SearchInput() {
  return (
    <TextFieldStyled
      fullWidth
      variant="outlined"
      id="input-with-icon-textfield"
      placeholder="Search"
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
