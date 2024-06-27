import {
  clothesSizeData,
  shoeSizeData,
} from 'src/pages/SizesGuidePage/tableData';

export const clothesSizes = clothesSizeData.rows.map((row) => ({
  label: row[3],
  value: row[4],
}));

export const shoesSizes = shoeSizeData.rows.map((row) => ({
  label: row[0],
  value: row[1],
}));

export const jeansSizes = [
  { label: 'W 27 H 33', value: 'W 27 H 33' },
  { label: 'W 28 H 34', value: 'W 28 H 34' },
  { label: 'W 26 H 35', value: 'W 26 H 35' },
  { label: 'W 25 H 36', value: 'W 25 H 36' },
  { label: 'W 30 H 38', value: 'W 30 H 38' },
  { label: 'W 32 H 40', value: 'W 32 H 40' },
  { label: 'W 28 H 37', value: 'W 28 H 37' },
  { label: 'W 27 H 32', value: 'W 27 H 32' },
  { label: 'W 31 H 39', value: 'W 31 H 39' },
  { label: 'W 29 H 35', value: 'W 29 H 35' },
];
