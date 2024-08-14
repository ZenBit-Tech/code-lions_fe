import { useGetProductBrandsQuery } from 'src/redux/vendorProduct/vendorProductService';

const useGetProductBrands = () => {
  const { data: fetchedBrands } = useGetProductBrandsQuery();

  const brands = [
    { label: 'Select brand', value: 'Select brand' },
    ...(fetchedBrands
      ? fetchedBrands.map((fetchedBrand) => ({
          label: fetchedBrand,
          value: fetchedBrand,
        }))
      : []),
  ];

  return brands;
};

export default useGetProductBrands;
