import { Outlet } from 'react-router-dom';

import { Grid } from '@mui/material';

import HeaderAdmin from 'src/components/HeaderAdmin';
import MainSection from 'src/components/shared/MainSection';
import SideBar from 'src/components/SidebarAdmin';

function AdminLayout() {
  return (
    <Grid container sx={{ minHeight: '100vh' }} columns={5}>
      <Grid item xs={1} padding="15px 24px">
        <SideBar />
      </Grid>
      <Grid item xs={4}>
        <HeaderAdmin />
        <MainSection>
          <Outlet />
        </MainSection>
      </Grid>
    </Grid>
  );
}

export default AdminLayout;
