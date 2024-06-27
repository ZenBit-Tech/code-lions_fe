import { Outlet } from 'react-router-dom';

import { Grid } from '@mui/material';

import MainSection from 'src/components/shared/MainSection';

import VendorHeader from './VendorHeader';
import VendorSideBar from './VendorSideBar';

function VendorLayout() {
  return (
    <Grid container sx={{ minHeight: '100vh' }} columns={5}>
      <Grid item xs={1} padding="15px 24px">
        <VendorSideBar />
      </Grid>
      <Grid item xs={4}>
        <VendorHeader />
        <MainSection>
          <Outlet />
        </MainSection>
      </Grid>
    </Grid>
  );
}

export default VendorLayout;
