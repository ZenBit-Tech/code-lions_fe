import React from 'react';
import { useTranslation } from 'react-i18next';

import { Grid, Typography, GridProps } from '@mui/material';

type GridWrapperProps<T> = {
  data: T[];
  message: string;

  renderCard: (item: T) => React.ReactNode;
} & GridProps;

function GridWrapper<T>({
  data,
  message,

  renderCard,
  ...gridProps
}: GridWrapperProps<T>): JSX.Element {
  const { t } = useTranslation();

  return (
    <Grid container {...gridProps}>
      {data.length === 0 ? (
        <Grid item>
          <Typography variant="h3">{t(message)}</Typography>
        </Grid>
      ) : (
        data.map((item, index) => (
          <Grid item key={index}>
            {renderCard(item)}
          </Grid>
        ))
      )}
    </Grid>
  );
}

export default GridWrapper;
