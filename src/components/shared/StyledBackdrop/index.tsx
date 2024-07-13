import { ReactNode } from 'react';

import Backdrop from '@mui/material/Backdrop';

interface IStyledBackdrop {
  children: ReactNode;
  showModal: boolean;
}

function StyledBackdrop({ children, showModal }: IStyledBackdrop) {
  return (
    <Backdrop
      sx={{
        backgroundColor: (theme) => theme.palette.grey[400],
        zIndex: (theme) => theme.zIndex.drawer,
      }}
      open={showModal}
    >
      {children}
    </Backdrop>
  );
}

export default StyledBackdrop;
