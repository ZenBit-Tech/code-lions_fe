import { Link, useLocation } from 'react-router-dom';

import { Box, IconButton } from '@mui/material';

import DeleteIcon from 'src/assets/icons/delete-trash.svg';
import LookIcon from 'src/assets/icons/eye.svg';

interface IActionButtons {
  productId: string;
  handleOpen: () => void;
}

function ActionButtonsProduct({ productId, handleOpen }: IActionButtons) {
  const location = useLocation();

  return (
    <Box display="flex" gap="16px" alignItems="center" justifyContent="center">
      <IconButton sx={{ padding: 0 }} onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Link to={`${productId}`} state={{ from: location }}>
        <IconButton sx={{ padding: 0 }}>
          <LookIcon />
        </IconButton>
      </Link>
    </Box>
  );
}

export default ActionButtonsProduct;
