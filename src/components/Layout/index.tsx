import { Outlet } from 'react-router-dom';

import { Box } from '@mui/system';

import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import theme from 'src/theme';

function AdminLayout() {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100svh',
      }}
    >
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          flex: 1,
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default AdminLayout;
