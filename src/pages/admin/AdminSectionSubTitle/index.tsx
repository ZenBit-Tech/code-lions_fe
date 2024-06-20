import { Typography, Box } from '@mui/material';

import OvalIcon from 'src/assets/icons/admin/oval.svg';

interface IAdminSectionSubTitle {
  title: string;
}

function AdminSectionSubTitle({ title }: IAdminSectionSubTitle) {
  return (
    <Box display="flex" alignItems="center">
      <OvalIcon />
      <Typography
        variant="subtitle1"
        sx={{ fontSize: '20px', marginLeft: '12px' }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default AdminSectionSubTitle;
