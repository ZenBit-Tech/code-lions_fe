import { ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

interface IProfileInputProps {
  label: string;
  children: ReactNode;
}

function ProfileInputWrapper(props: IProfileInputProps) {
  const { label, children } = props;

  return (
    <Box display="flex" flexDirection="column" height="74px" margin="16px 0">
      <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
        {label}
      </Typography>
      <Box height="48px" padding="6px 18px 12px 0">
        {children}
      </Box>
    </Box>
  );
}

export default ProfileInputWrapper;
