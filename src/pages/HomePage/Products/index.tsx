import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/material';

import { homeProductsSorting } from 'src/common/constants';
import ProductCard from 'src/components/ProductCard';
import { IProduct } from 'src/redux/product/types.ts';

import { TabButton, TabsWrapper } from './styles';

const userSize = 'Size1';
const dateToCompare = '2024-02-01';
const products: IProduct[] = [
  {
    id: '1',
    name: 'Product 1',
    slug: 'product-1',
    price: 100,
    description: 'Description for Product 1',
    categories: ['Category1', 'Category2'],
    style: 'Style1',
    type: 'Type1',
    size: 'Size1',
    images: ['image1.jpg'],
    colors: ['Red', 'Blue'],
    vendor: {
      id: 'vendor1',
      name: 'Vendor 1',
      photoUrl: 'vendor1.jpg',
    },
    createdAt: '2024-01-01',
    lastUpdatedAt: '2024-01-04',
  },
  {
    id: '2',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2021-02-02',
  },
  {
    id: '3',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2024-02-03',
  },
  {
    id: '4',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2021-02-02',
  },
  {
    id: '5',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2021-02-02',
  },
  {
    id: '6',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2024-01-02',
  },
  {
    id: '7',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2024-01-02',
  },
  {
    id: '8',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2024-01-02',
  },
  {
    id: '9',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2024-01-02',
  },
  {
    id: '10',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size1',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2024-01-02',
  },
  {
    id: '11',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size1',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-02-01',
    lastUpdatedAt: '2024-01-02',
  },
  {
    id: '12',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2024-01-01',
    lastUpdatedAt: '2024-02-02',
  },
  {
    id: '13',
    name: 'Product 2',
    slug: 'product-2',
    price: 150,
    description: 'Description for Product 2',
    categories: ['Category2', 'Category3'],
    style: 'Style2',
    type: 'Type2',
    size: 'Size2',
    images: ['image2.jpg'],
    colors: ['Green', 'Yellow'],
    vendor: {
      id: 'vendor2',
      name: 'Vendor 2',
      photoUrl: 'vendor2.jpg',
    },
    createdAt: '2025-03-03',
    lastUpdatedAt: '2026-03-03',
  },
];

function ProductFeedPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(homeProductsSorting.RECOMMENDED);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredProducts = products.filter((product) => {
    if (activeTab === homeProductsSorting.RECOMMENDED) return true;
    if (activeTab === homeProductsSorting.JUST_IN)
      return new Date(product.createdAt) > new Date(dateToCompare);
    if (activeTab === homeProductsSorting.YOUR_SIZE)
      return product.size === userSize;

    return true;
  });

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
              {filteredProducts.map((product) => (
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
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductFeedPage;
