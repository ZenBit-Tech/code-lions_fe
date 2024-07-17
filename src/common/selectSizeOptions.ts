import {
  clothesSizeData,
  shoeSizeData,
  jeansSizeData,
} from 'src/pages/SizesGuidePage/tableData';

export const clothesSizes = clothesSizeData.rows.map((row) => ({
  label: row[3],
  value: row[3],
}));
export const shoesSizes = shoeSizeData.rows.map((row) => ({
  label: row[0],
  value: row[0],
}));
export const jeansSizes = jeansSizeData.rows.map((row) => ({
  label: row[0],
  value: row[0],
}));
