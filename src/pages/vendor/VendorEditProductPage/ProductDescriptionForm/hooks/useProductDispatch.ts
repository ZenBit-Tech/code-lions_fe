import {
  accessoriesCategory,
  accessoryProductType,
  bagProductType,
  bagsCategory,
  clothingCategory,
  designersCategory,
  dressType,
  eventalCategory,
  jeansType,
  otherType,
  shoesCategory,
  shoesType,
} from 'src/pages/vendor/VendorAddProductPage/ProductDescriptionForm/productDescriptionConstants';
import {
  setBrand,
  setNewColors,
  setDescription,
  setMaterial,
  setName,
  setSize,
} from 'src/redux/addProduct/addProductSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

const useProductDispatch = (
  productName: string,
  productDescription: string,
  productBrand: string,
  shoesSize: string,
  clothesSize: string,
  uniqueSize: string,
  jeansSize: string,
  productColors: string[],
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
      (selectedType === dressType && selectedCategory === clothingCategory) ||
      (selectedCategory === clothingCategory && selectedType === otherType) ||
      (selectedCategory === designersCategory && selectedType === dressType) ||
      selectedType === otherType ||
      (selectedCategory === eventalCategory && selectedType === dressType)
    ) {
      dispatch(setSize(clothesSize));
    } else if (
      selectedCategory === bagsCategory ||
      selectedCategory === accessoriesCategory ||
      (selectedCategory === eventalCategory &&
        selectedType === bagProductType) ||
      (selectedCategory === designersCategory &&
        selectedType === bagProductType) ||
      selectedType === accessoryProductType
    ) {
      dispatch(setSize(uniqueSize));
    } else if (selectedType === jeansType) {
      dispatch(setSize(jeansSize));
    }

    dispatch(setNewColors(productColors));

    dispatch(
      setMaterial(
        selectedCategory === shoesCategory || selectedType === shoesType
          ? shoesMaterial
          : productMaterial?.toLowerCase()
      )
    );
  };
};

export default useProductDispatch;
