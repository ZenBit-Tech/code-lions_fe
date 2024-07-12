import { useEffect, useState, useCallback, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Box, CircularProgress } from '@mui/material';

import { homeProductsSorting } from 'src/common/constants';
import ProductCard from 'src/components/ProductCard';
import RegularText from 'src/components/shared/RegularText';
import {
  useGetProductsBySizesQuery,
  useGetLatestProductsQuery,
  useGetProductsQuery,
} from 'src/redux/product/productService';
import { IProduct } from 'src/redux/product/types';
import {
  selectUserClothesSize,
  selectUserJeansSize,
  selectUserShoesSize,
} from 'src/redux/user/userSlice';

import { TabButton, TabsWrapper } from './styles';

function ProductFeedPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(homeProductsSorting.RECOMMENDED);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const clothesSize = useSelector(selectUserClothesSize);
  const jeansSize = useSelector(selectUserJeansSize);
  const shoesSize = useSelector(selectUserShoesSize);

  const { data: latestProductsResponse, isFetching: isFetchingLatest } =
    useGetLatestProductsQuery();
  const { data: productsBySizesResponse, isFetching: isFetchingSizes } =
    useGetProductsBySizesQuery({
      clothesSize: clothesSize || '',
      jeansSize: jeansSize || '',
      shoesSize: shoesSize || '',
    });
  const {
    data: recommendedProductsResponse,
    isFetching: isFetchingRecommended,
  } = useGetProductsQuery();

  const fetchProducts = useCallback(
    async (tab: string) => {
      setIsLoading(true);
      let products: SetStateAction<IProduct[]> = [];

      switch (tab) {
        case homeProductsSorting.JUST_IN:
          products = latestProductsResponse?.products || [];
          break;

        case homeProductsSorting.YOUR_SIZE:
          products = productsBySizesResponse?.products || [];
          break;

        case homeProductsSorting.RECOMMENDED:
          products = recommendedProductsResponse?.products || [];
          break;

        default:
          break;
      }
      setFilteredProducts(products);
      setIsLoading(false);
    },
    [
      latestProductsResponse,
      productsBySizesResponse,
      recommendedProductsResponse,
    ]
  );

  useEffect(() => {
    if (!isFetchingLatest && !isFetchingSizes && !isFetchingRecommended) {
      fetchProducts(activeTab);
    }
  }, [
    activeTab,
    fetchProducts,
    isFetchingLatest,
    isFetchingSizes,
    isFetchingRecommended,
  ]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if (
    isLoading ||
    isFetchingLatest ||
    isFetchingSizes ||
    isFetchingRecommended
  ) {
    return <CircularProgress />;
  }

  return (
    <>
      <Box sx={{ width: '100%', padding: '0 18px' }}>
        <TabsWrapper>
          <TabButton
            active={activeTab === homeProductsSorting.RECOMMENDED}
            onClick={() => handleTabClick(homeProductsSorting.RECOMMENDED)}
          >
            {t('home.recommended')}
          </TabButton>
          <TabButton
            active={activeTab === homeProductsSorting.JUST_IN}
            onClick={() => handleTabClick(homeProductsSorting.JUST_IN)}
          >
            {t('home.justIn')}
          </TabButton>
          <TabButton
            active={activeTab === homeProductsSorting.YOUR_SIZE}
            onClick={() => handleTabClick(homeProductsSorting.YOUR_SIZE)}
          >
            {t('home.yourSize')}
          </TabButton>
        </TabsWrapper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '1440px',
            margin: '0 auto',
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '24px',
                mb: '40px',
              }}
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Box
                    key={product.id}
                    component="div"
                    sx={{
                      width: {
                        xs: '100%',
                        md: 'calc(50% - 20px)',
                        lg: 'calc(33% - 19px)',
                        xl: 'calc(25% - 18px)',
                      },
                    }}
                  >
                    <ProductCard key={product.id} item={product} />
                  </Box>
                ))
              ) : (
                <Box sx={{ marginBottom: '150px' }}>
                  <RegularText>{t('home.noProductsFound')}</RegularText>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductFeedPage;
