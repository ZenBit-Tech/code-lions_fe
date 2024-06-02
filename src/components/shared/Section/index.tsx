import { ReactNode } from 'react';
import { Grid } from '@mui/material';
import BackgroundImage from 'src/components/shared/BackgroundImage';
import Logo from 'src/components/shared/Logo';
import useRoute from './sectionHook';

interface ISectionProps {
  children: ReactNode;
}

function Section({ children }: ISectionProps): JSX.Element {
  const { backgroundImage, logoColor } = useRoute();

  return (
    <Grid container sx={{ height: '100vh' }} columns={{ xs: 1, md: 5 }}>
      <Grid item xs={false} md={3}>
        <BackgroundImage url={backgroundImage}>
          <Logo logoColor={logoColor} />
        </BackgroundImage>
      </Grid>
      <Grid
        item
        xs={1}
        md={2}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
}

export default Section;
