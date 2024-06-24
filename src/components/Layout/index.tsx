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
        component="section"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%',
          flex: 2,
          minHeight: 0,
          backgroundColor: theme.palette.background.default,
          paddingBottom: '200px',
        }}
      >
        <Outlet />
      </Box>
      <Box
        component="footer"
        sx={{
          position: 'relative',
          width: '100%',
          mt: 'auto',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}

export default AdminLayout;
