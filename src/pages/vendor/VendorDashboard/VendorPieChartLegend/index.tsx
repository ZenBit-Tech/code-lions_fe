import { useTranslation } from 'react-i18next';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';

import { IVendorPieChartLegendProps } from '../types';

import { TableBodyCellStyled, TableCellStyled, TableRowStyled } from './styles';

function VendorPieChartLegend({ data }: IVendorPieChartLegendProps) {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCellStyled align="left">
              {t('vendorDashboard.source')}
            </TableCellStyled>
            <TableCellStyled align="left">
              {t('vendorDashboard.orders')}
            </TableCellStyled>
            <TableCellStyled align="left">
              {t('vendorDashboard.amount')}
            </TableCellStyled>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRowStyled key={row.id}>
              <TableBodyCellStyled
                align="left"
                sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <Box
                  sx={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: row.color,
                  }}
                />
                {row.category}
              </TableBodyCellStyled>
              <TableBodyCellStyled align="left">
                {row.orders}
              </TableBodyCellStyled>
              <TableBodyCellStyled align="left">
                ${row.value}
              </TableBodyCellStyled>
            </TableRowStyled>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default VendorPieChartLegend;
