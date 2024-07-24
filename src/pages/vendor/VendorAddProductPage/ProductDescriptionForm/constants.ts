import {
  clothesSizeData,
  shoeSizeData,
} from 'src/pages/SizesGuidePage/tableData';

export const brands = [
  { label: 'Select brand', value: 'Select brand' },
  { label: 'Michael Kors', value: 'Michael Kors' },
  { label: 'Chiara Ferragni', value: 'Chiara Ferragni' },
  { label: 'Beatrice B', value: 'Beatrice B' },
  { label: 'Nai Lu-na', value: 'Nai Lu-na' },
  { label: 'Marjolaine', value: 'Marjolaine' },
  { label: 'Luisa Cerano', value: 'Luisa Cerano' },
  { label: 'Deni Cler Milano', value: 'Deni Cler Milano' },
  { label: 'KENZO', value: 'KENZO' },
  { label: 'Andres Sarda', value: 'Andres Sarda' },
  { label: 'Lolita dress', value: 'Lolita dress' },
  { label: 'Armani Exchange', value: 'Armani Exchange' },
  { label: 'Diesel', value: 'Diesel' },
  { label: 'Other', value: 'Other' },
];

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

export const uniqueSizes = [{ label: 'Unique size', value: 'Unique size' }];

export const colors = [
  { label: 'Select color', value: 'Select color' },
  { label: 'black', value: 'black' },
  { label: 'blue', value: 'blue' },
  { label: 'brown', value: 'brown' },
  { label: 'green', value: 'green' },
  { label: 'grey', value: 'grey' },
  { label: 'orange', value: 'orange' },
  { label: 'yellow', value: 'yellow' },
  { label: 'pink', value: 'pink' },
  { label: 'purple', value: 'purple' },
  { label: 'red', value: 'red' },
  { label: 'white', value: 'white' },
];

export const materials = [
  { label: 'Select material', value: 'Select material' },
  { label: 'Chiffon', value: 'Chiffon' },
  { label: 'Cotton', value: 'Cotton' },
  { label: 'Crepe', value: 'Crepe' },
  { label: 'Denim', value: 'Denim' },
  { label: 'Lace', value: 'Lace' },
  { label: 'Leather', value: 'Leather' },
  { label: 'Linen', value: 'Linen' },
  { label: 'Satin', value: 'Satin' },
  { label: 'Silk', value: 'Silk' },
  { label: 'Nylon', value: 'Nylon' },
  { label: 'Polyester', value: 'Polyester' },
  { label: 'Spandex', value: 'Spandex' },
  { label: 'Velvet', value: 'Velvet' },
  { label: 'Wool', value: 'Wool' },
];

export const shoesMaterials = [
  { label: 'Select material', value: 'Select material' },
  { label: 'leather', value: 'leather' },
  { label: 'textile', value: 'textile' },
  { label: 'synthetic', value: 'synthetic' },
  { label: 'rubber', value: 'rubber' },
  { label: 'foam', value: 'foam' },
  { label: 'plastic', value: 'plastic' },
];

export const shoesCategory = 'Shoes';
export const bagsCategory = 'Bags';
export const accessoriesCategory = 'Accessories';

export const shoesType = 'shoes';
export const dressType = 'dress';
export const jeansType = 'jeans';
export const otherType = 'other';
