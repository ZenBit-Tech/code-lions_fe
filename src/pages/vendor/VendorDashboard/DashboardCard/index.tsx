import { Typography } from '@mui/material';
import { Box } from '@mui/system';

import ArrowDownIcon from 'src/assets/icons/vendor/arrow-down.svg';
import ArrowUpIcon from 'src/assets/icons/vendor/arrow-up.svg';

import { Card, SubTitleSuccess, SubTitleWarning } from './styles';

interface IDashboardCardProps {
  title: string;
  amount: number;
  change: number;
}

function DashboardCard({ title, amount, change }: IDashboardCardProps) {
  return (
    <Card>
      <Typography variant="button" component="h3">
        {title}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h3"
          sx={{ fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.72px' }}
        >
          ${amount}
        </Typography>
        {change >= 0 ? (
          <SubTitleSuccess variant="subtitle2">
            <ArrowUpIcon /> {change}%
          </SubTitleSuccess>
        ) : (
          <SubTitleWarning variant="subtitle2">
            <ArrowDownIcon /> {change}%
          </SubTitleWarning>
        )}
      </Box>
    </Card>
  );
}

export default DashboardCard;
