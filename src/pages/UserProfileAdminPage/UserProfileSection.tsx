import { Grid, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ArrowLeft from 'src/assets/icons/arrow-left.svg';
import { StyledUserSection } from './styles';

function UserProfileSection() {
  return (
    <StyledUserSection>
      <Box>
        <Typography>Superadmin / Buyer Profile</Typography>
        <Typography variant="h1" sx={{ margin: '24px 0' }}>
          <IconButton>
            <ArrowLeft />
          </IconButton>
          Buyer
        </Typography>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '24px',
          }}
        >
          <Typography variant="h3">Buyer</Typography>
          <Grid container columns={2} width="100%">
            <Grid item xs={1}>
              Name
            </Grid>
            <Grid item xs={1}>
              Email
            </Grid>
          </Grid>
        </Box>
      </Box>
    </StyledUserSection>
  );
}

export default UserProfileSection;
