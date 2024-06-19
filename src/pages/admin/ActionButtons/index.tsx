import { Link, useLocation } from 'react-router-dom';

import { Box, IconButton } from '@mui/material';

import DeleteIcon from 'src/assets/icons/delete-trash.svg';
import EditIcon from 'src/assets/icons/edit-pencil.svg';
import LookIcon from 'src/assets/icons/eye.svg';
import { linkUrls } from 'src/common/constants';

interface IActionButtons {
  userId: string;

  handleOpen: () => void;
}

function ActionButtons({ userId, handleOpen }: IActionButtons) {
  const location = useLocation();

  return (
    <Box display="flex" gap="16px" alignItems="flex-start">
      <Link
        to={`${linkUrls.ADMIN_USER_PROFILE_EDIT}/${userId}`}
        state={{ from: location }}
      >
        <EditIcon />
      </Link>
      <IconButton sx={{ padding: 0 }} onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Link to={`${userId}`} state={{ from: location }}>
        <LookIcon />
      </Link>
    </Box>
  );
}

export default ActionButtons;
