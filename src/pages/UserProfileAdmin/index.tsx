import { Grid } from '@mui/material';
import SideBar from './SideBar';
import TopBar from './TopBar';
import UserProfileSection from './UserProfileSection';

function UserProfileAdmin() {
  return (
    <Grid container sx={{ height: '100vh' }} columns={5}>
      <Grid item xs={1} padding="15px 24px">
        <SideBar />
      </Grid>
      <Grid item xs={4} height="100%">
        <TopBar />
        <UserProfileSection />
      </Grid>
    </Grid>
  );
}

export default UserProfileAdmin;
