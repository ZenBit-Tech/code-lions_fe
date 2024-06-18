import { Link, useLocation } from 'react-router-dom';

import { Box, IconButton } from '@mui/material';

import DeleteIcon from 'src/assets/icons/delete-trash.svg';
import EditIcon from 'src/assets/icons/edit-pencil.svg';
import LookIcon from 'src/assets/icons/eye.svg';
import { urls, userRoles } from 'src/common/constants';

interface IActionButtons {
  id: string;
  role: string;
  handleOpen: () => void;
}

function ActionButtons({ id, role, handleOpen }: IActionButtons) {
  const location = useLocation();

  return (
    <Box display="flex" gap="16px" alignItems="flex-start">
      <Link
        to={
          role === userRoles.BUYER
            ? `../${urls.ADMIN_BUYER_PROFILE_EDIT}/${id}`
            : `../${urls.ADMIN_VENDOR_PROFILE_EDIT}/${id}`
        }
        state={{ from: location }}
      >
        <EditIcon />
      </Link>
      <IconButton sx={{ padding: 0 }} onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Link
        to={
          role === userRoles.BUYER
            ? `../${urls.ADMIN_BUYER_PROFILE}/${id}`
            : `../${urls.ADMIN_VENDOR_PROFILE}/${id}`
        }
        state={{ from: location }}
      >
        <LookIcon />
      </Link>
    </Box>
  );
}

export default ActionButtons;
