import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { InputAdornment } from '@mui/material';

import SearchIcon from 'src/assets/icons/search.svg';

import TextFieldStyled from './styles';

interface ISearchInput {
  setSearch: (value: string) => void;
}

function SearchInput({ setSearch }: ISearchInput) {
  const { t } = useTranslation();
  const { control } = useFormContext();

  return (
    <Controller
      name="search"
      control={control}
      defaultValue=""
      render={({ field }) => (
        <TextFieldStyled
          {...field}
          onChange={(e) => {
            setSearch(e.target.value);
            field.onChange(e);
          }}
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
      )}
    />
  );
}

export default SearchInput;
