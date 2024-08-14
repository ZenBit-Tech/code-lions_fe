import { Link, useLocation } from 'react-router-dom';

import { Box, IconButton } from '@mui/material';

import DeleteIcon from 'src/assets/icons/delete-trash.svg';
import EditIcon from 'src/assets/icons/edit-pencil.svg';
import LookIcon from 'src/assets/icons/eye.svg';
import { linkUrls, urls } from 'src/common/constants';
import { setPending } from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch } from 'src/redux/hooks';

interface IActionButtons {
  productId: string;

  handleOpen: () => void;
}

function ActionButtons({ productId, handleOpen }: IActionButtons) {
  const location = useLocation();
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" gap="16px" alignItems="center">
      <Link
        to={`/${linkUrls.VENDOR_EDIT_PRODUCT}/${productId}`}
        state={{ from: location }}
        onClick={() => dispatch(setPending(false))}
      >
        <IconButton sx={{ padding: 0 }}>
          <EditIcon />
        </IconButton>
      </Link>
      <IconButton sx={{ padding: 0 }} onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Link
        to={`${urls.PUBLIC_PRODUCT}/${productId}`}
        state={{ from: location }}
      >
        <IconButton sx={{ padding: 0 }}>
          <LookIcon />
        </IconButton>
      </Link>
    </Box>
  );
}

export default ActionButtons;
