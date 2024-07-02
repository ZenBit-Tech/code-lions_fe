import { useNavigate } from 'react-router-dom';

import { IconButton } from '@mui/material';

import ArrowBackIcon from 'src/assets/icons/arrow-left.svg';

interface ArrowButtonProps {
  to: string;
}

function ArrowButtonTo({ to }: ArrowButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to, { replace: true });
  };

  return (
    <IconButton onClick={handleClick}>
      <ArrowBackIcon />
    </IconButton>
  );
}

export default ArrowButtonTo;
