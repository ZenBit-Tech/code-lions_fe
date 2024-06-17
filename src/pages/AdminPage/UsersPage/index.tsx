import { IconButton, Typography } from '@mui/material';

import OvalIcon from 'src/assets/icons/admin/oval.svg';
import SortIcon from 'src/assets/icons/admin/sort.svg';
import SearchInput from 'src/components/shared/SearchInput';

function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      <div>
        <div>
          <div>
            <OvalIcon />
            <h2>User list</h2>
          </div>
          <IconButton>
            <Typography>Sort</Typography>
            <SortIcon />
          </IconButton>
        </div>
        <SearchInput />
      </div>
    </div>
  );
}

export default UsersPage;
