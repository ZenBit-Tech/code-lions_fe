import {
  setBrand,
  setColor,
  setDescription,
  setMaterial,
  setName,
  setSize,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

import {
  accessoriesCategory,
  bagsCategory,
  dressType,
  jeansType,
  otherType,
  shoesCategory,
  shoesType,
} from '../constants';

const useProductDispatch = (
  productName: string,
  productDescription: string,
  productBrand: string,
  shoesSize: string,
  clothesSize: string,
  uniqueSize: string,
  jeansSize: string,
  productColor: string,
  shoesMaterial: string,
  productMaterial: string
): (() => void) => {
  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector(
    (state) => state.addProduct.categories[0]
  );
  const selectedType = useAppSelector((state) => state.addProduct.type);

  return () => {
    dispatch(setName(productName));
    dispatch(setDescription(productDescription));
    dispatch(setBrand(productBrand));

    if (selectedCategory === shoesCategory || selectedType === shoesType) {
      dispatch(setSize(shoesSize));
    } else if (
      selectedType === dressType ||
      (selectedType === otherType && selectedCategory !== shoesCategory)
    ) {
      dispatch(setSize(clothesSize));
    } else if (
      selectedCategory === bagsCategory ||
      selectedCategory === accessoriesCategory
    ) {
      dispatch(setSize(uniqueSize));
    } else if (selectedType === jeansType) {
      dispatch(setSize(jeansSize));
    }

    dispatch(setColor(productColor));

    dispatch(
      setMaterial(
        selectedCategory === shoesCategory || selectedType === shoesType
          ? shoesMaterial
          : productMaterial
      )
    );
  };
};

export default useProductDispatch;
