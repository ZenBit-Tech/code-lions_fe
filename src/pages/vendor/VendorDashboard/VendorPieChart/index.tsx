import { useTranslation } from 'react-i18next';

import { Typography, Box } from '@mui/material';
import { PieChart } from '@mui/x-charts';

import { IVendorPieChartProps } from '../types';
import VendorPieChartLegend from '../VendorPieChartLegend';

import { ChartWrapper, SubTitle } from './styles';

const chartColors: Record<string, string> = {
  clothing: '#EDEAE9',
  shoes: '#F4E2DB',
  bags: '#C7D2C6',
  accessories: '#E3EEE2',
  designers: '#c6d2cf',
  evental: '#d2c6cf',
};

function VendorPieChart({ data }: IVendorPieChartProps) {
  const { t } = useTranslation();

  const chartMargins = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  const coloredData = data.map((item) => ({
    id: item.id,
    value: item.value,
    color: chartColors[item.id],
  }));

  const legendData = data.map((item) => ({
    ...item,
    color: chartColors[item.id],
  }));

  const valueFormatter = ({ value }: { value: number }) => `$${value}`;

  return (
    <ChartWrapper>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Typography variant="button" component="h3">
          {t('vendorDashboard.salesByCategories')}
        </Typography>
        <SubTitle variant="overline">{t('vendorDashboard.byWeek')}</SubTitle>
      </Box>
      <PieChart
        series={[
          {
            data: coloredData,
            innerRadius: 50,
            valueFormatter,
          },
        ]}
        width={206}
        height={206}
        margin={chartMargins}
      />
      <VendorPieChartLegend data={legendData} />
    </ChartWrapper>
  );
}

export default VendorPieChart;
