import {
  clothesSizeData,
  shoeSizeData,
} from 'src/pages/SizesGuidePage/tableData';

export const clothesSizes = clothesSizeData.rows.map((row) => ({
  label: row[3],
  value: row[3],
}));

export const shoesSizes = shoeSizeData.rows.map((row) => ({
  label: row[0],
  value: row[0],
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
  { label: 'Black', value: 'black' },
  { label: 'Blue', value: 'blue' },
  { label: 'Brown', value: 'brown' },
  { label: 'Green', value: 'green' },
  { label: 'Grey', value: 'grey' },
  { label: 'Orange', value: 'orange' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Pink', value: 'pink' },
  { label: 'Purple', value: 'purple' },
  { label: 'Red', value: 'red' },
  { label: 'White', value: 'white' },
];

export const materials = [
  { label: 'Select material', value: 'Select material' },
  { label: 'Chiffon', value: 'chiffon' },
  { label: 'Cotton', value: 'cotton' },
  { label: 'Crepe', value: 'crepe' },
  { label: 'Denim', value: 'denim' },
  { label: 'Lace', value: 'lace' },
  { label: 'Leather', value: 'leather' },
  { label: 'Linen', value: 'linen' },
  { label: 'Satin', value: 'satin' },
  { label: 'Silk', value: 'silk' },
  { label: 'Nylon', value: 'nylon' },
  { label: 'Polyester', value: 'polyester' },
  { label: 'Spandex', value: 'spandex' },
  { label: 'Velvet', value: 'velvet' },
  { label: 'Wool', value: 'wool' },
];

export const shoesMaterials = [
  { label: 'Select material', value: 'Select material' },
  { label: 'Leather', value: 'leather' },
  { label: 'Textile', value: 'textile' },
  { label: 'Synthetic', value: 'synthetic' },
  { label: 'Rubber', value: 'rubber' },
  { label: 'Foam', value: 'foam' },
  { label: 'Plastic', value: 'plastic' },
];

export const bagTypeOptions = [
  { label: 'Select type', value: 'Select type' },
  { label: 'Bag', value: 'bag' },
  { label: 'Other', value: 'other' },
];

export const accessoryTypeOptions = [
  { label: 'Select type', value: 'Select type' },
  { label: 'Accessory', value: 'accessory' },
  { label: 'Other', value: 'other' },
];

export const shoesTypeOptions = [
  { label: 'Select type', value: 'Select type' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Other', value: 'other' },
];

export const clothingTypeOptions = [
  { label: 'Select type', value: 'Select type' },
  { label: 'Dress', value: 'dress' },
  { label: 'Jeans', value: 'jeans' },
  { label: 'Other', value: 'other' },
];

export const shoesCategory = 'shoes';
export const bagsCategory = 'bags';
export const accessoriesCategory = 'accessories';
export const clothingCategory = 'clothing';
export const designersCategory = 'designers';
export const eventalCategory = 'evental';

export const shoesType = 'shoes';
export const dressType = 'dress';
export const jeansType = 'jeans';
export const otherType = 'other';
