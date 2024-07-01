import { useTranslation } from 'react-i18next';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BarChart } from '@mui/x-charts';

import { ChartWrapper, SubTitle } from './styles';

const valueFormatter = (value: number | null) => `$${value}`;

const chartSetting = {
  yAxis: [{ valueFormatter }],
  width: 650,
  height: 460,
};

interface IVendorBarChartProps {
  dataset: {
    month: string;
    amount: number;
  }[];
}

function VendorBarChart({ dataset }: IVendorBarChartProps) {
  const { t } = useTranslation();

  const chartMargins = {
    top: 40,
    bottom: 40,
    left: 45,
    right: 0,
  };

  return (
    <ChartWrapper>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="button" component="h3">
          {t('vendorDashboard.revenueAnalytics')}
        </Typography>
        <SubTitle variant="overline">{t('vendorDashboard.yearly')}</SubTitle>
      </Box>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'month',
            tickSize: 0,
          },
        ]}
        series={[{ dataKey: 'amount', valueFormatter }]}
        grid={{ horizontal: true }}
        borderRadius={6}
        margin={chartMargins}
        {...chartSetting}
      />
    </ChartWrapper>
  );
}

export default VendorBarChart;
