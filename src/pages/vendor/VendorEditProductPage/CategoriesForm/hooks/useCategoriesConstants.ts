import { useTranslation } from 'react-i18next';

interface IProductFeature {
  label: string;
  value: string;
}

interface IUseCategoriesConstantsReturn {
  productCategories: IProductFeature[];
  clothesTypes: IProductFeature[];
  styles: IProductFeature[];
}

const useCategoriesConstants = (): IUseCategoriesConstantsReturn => {
  const { t } = useTranslation();
  const productCategories = [
    {
      label: t('productCategories.accessories.label'),
      value: t('productCategories.accessories.value'),
    },
    {
      label: t('productCategories.bags.label'),
      value: t('productCategories.bags.value'),
    },
    {
      label: t('productCategories.clothing.label'),
      value: t('productCategories.clothing.value'),
    },
    {
      label: t('productCategories.shoes.label'),
      value: t('productCategories.shoes.value'),
    },
    {
      label: t('productCategories.designers.label'),
      value: t('productCategories.designers.value'),
    },
    {
      label: t('productCategories.evental.label'),
      value: t('productCategories.evental.value'),
    },
  ];

  const clothesTypes = [
    {
      label: t('productTypes.shoes.label'),
      value: t('productTypes.shoes.value'),
    },
    {
      label: t('productTypes.dress.label'),
      value: t('productTypes.dress.value'),
    },
    {
      label: t('productTypes.bag.label'),
      value: t('productTypes.bag.value'),
    },
    {
      label: t('productTypes.jeans.label'),
      value: t('productTypes.jeans.value'),
    },
    {
      label: t('productTypes.accessory.label'),
      value: t('productTypes.accessory.value'),
    },
    {
      label: t('productTypes.other.label'),
      value: t('productTypes.other.value'),
    },
  ];

  const styles = [
    {
      label: t('productStyles.casual.label'),
      value: t('productStyles.casual.value'),
    },
    {
      label: t('productStyles.premium.label'),
      value: t('productStyles.premium.value'),
    },
    {
      label: t('productStyles.fancy.label'),
      value: t('productStyles.fancy.value'),
    },
  ];

  return {
    productCategories,
    clothesTypes,
    styles,
  };
};

export default useCategoriesConstants;
