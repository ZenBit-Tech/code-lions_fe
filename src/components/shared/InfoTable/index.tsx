import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material';

import theme from 'src/theme';

interface ITableData {
  header: string[];
  rows: string[][];
}

interface IInfoTableProps {
  tableData: ITableData;
  lastLine?: string;
}

function InfoTable({ tableData, lastLine }: IInfoTableProps) {
  return (
    <TableContainer
      sx={{
        width: '857px',
        margin: '0 auto',
        border: '1px solid',
        borderColor: theme.palette.common.black,
        borderBottom: lastLine ? '1px solid' : 'none',
      }}
    >
      <Table>
        <TableHead
          sx={{
            borderBottomColor: theme.palette.common.black,
          }}
        >
          <TableRow sx={{ height: '40px' }}>
            {tableData.header.map((title, index) => (
              <TableCell
                align="left"
                key={index}
                sx={{
                  background: theme.palette.background.paper,
                  width: `calc(100% / ${tableData.header.length})`,
                  height: '24px',
                  padding: '4px 8px',
                }}
              >
                <Typography variant="caption">{title}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                height: '40px',
                background: theme.palette.common.white,
                borderBottomColor: theme.palette.common.black,
              }}
            >
              {row.map((value, index2) => (
                <TableCell
                  align="left"
                  key={index2}
                  sx={{
                    height: '24px',
                    padding: '4px 8px',
                    borderBottomColor: theme.palette.common.black,
                  }}
                >
                  <Typography
                    variant="caption"
                    color={theme.palette.common.black}
                  >
                    {value}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          ))}
          {lastLine && (
            <TableRow
              sx={{
                height: '40px',
                borderBottomColor: theme.palette.common.black,
                background: theme.palette.common.white,
              }}
            >
              <TableCell
                colSpan={tableData.header.length}
                align="center"
                sx={{
                  height: '24px',
                  padding: '4px 8px',
                  border: '0',
                }}
              >
                <Typography
                  variant="caption"
                  color={theme.palette.common.black}
                >
                  {lastLine}
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default InfoTable;
