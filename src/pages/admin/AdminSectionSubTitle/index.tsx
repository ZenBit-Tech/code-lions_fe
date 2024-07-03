import { Typography, Box } from '@mui/material';

import OvalIcon from 'src/assets/icons/admin/oval.svg';
import theme from 'src/theme';

interface IAdminSectionSubTitle {
  title: string;
}

function AdminSectionSubTitle({ title }: IAdminSectionSubTitle) {
  return (
    <Box display="flex" alignItems="center">
      <OvalIcon />
      <Typography
        variant="subtitle1"
        sx={{ fontSize: theme.typography.h5.fontSize, marginLeft: '12px' }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default AdminSectionSubTitle;
