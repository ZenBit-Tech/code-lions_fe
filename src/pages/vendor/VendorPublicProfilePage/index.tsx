import { useParams } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import { profilePathsFor } from 'src/common/constants';
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import ProductCard from 'src/components/ProductCard';
import CommentList from 'src/components/shared/CommentList';
import Container from 'src/components/shared/Container';
import RegularText from 'src/components/shared/RegularText';
import StyledPagination from 'src/pages/admin/StyledPagination';
import NotFoundPage from 'src/pages/NotFoundPage';
import { IProduct } from 'src/redux/product/types';

import useVendorPublicProfile from './hooks/useVendorPublicProfile';
import ProfileInfo from './ProfileInfo';
import {
  MainContainerWrapper,
  ProductsContainer,
  ProductsContainerWrapper,
  ReviewLabel,
  TabButton,
  TabsWrapper,
} from './styles';

function VendorPublicProfilePage() {
  const { id } = useParams<{ id: string }>();
  const {
    t,
    userName,
    userAvatar,
    userRating,
    reviewCount,
    formattedReviews,
    products,
    pagesCount,
    isLoading,
    page,
    activeTab,
    handleTabChange,
    handleChange,
    pageOne,
  } = useVendorPublicProfile();

  return (
    <Container>
      <Header />
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && !userName && <NotFoundPage />}

      {userName && (
        <MainContainerWrapper>
          <ProfileInfo
            name={userName}
            rating={userRating}
            avatar={userAvatar}
            id={id ?? ''}
          />
          <Container sx={{ marginLeft: '32px', width: '100%' }}>
            <TabsWrapper>
              <TabButton
                active={activeTab === t('vendorProfile.products')}
                onClick={() => handleTabChange(t('vendorProfile.products'))}
              >
                {t('vendorProfile.products')} ({products.length})
              </TabButton>
              <TabButton
                active={activeTab === t('vendorProfile.reviews')}
                onClick={() => handleTabChange(t('vendorProfile.reviews'))}
              >
                {t('vendorProfile.reviews')} ({reviewCount})
              </TabButton>
            </TabsWrapper>
            {activeTab === t('vendorProfile.reviews') && (
              <>
                <ReviewLabel>
                  {t('vendorProfile.reviews')} ({reviewCount})
                </ReviewLabel>
                {reviewCount > 0 ? (
                  <CommentList
                    comments={formattedReviews}
                    path={profilePathsFor.buyer}
                  />
                ) : (
                  <RegularText>{t('vendorProfile.noReviews')}</RegularText>
                )}
              </>
            )}
            {activeTab === t('vendorProfile.products') && (
              <>
                <ReviewLabel>
                  {t('vendorProfile.closet')} ({products.length})
                </ReviewLabel>
                {products.length > 0 ? (
                  <ProductsContainerWrapper>
                    <ProductsContainer>
                      {products.map((item: IProduct) => (
                        <Box
                          key={item.id}
                          component="div"
                          sx={{
                            width: {
                              xs: '100%',
                              md: 'calc(50% - 12px)',
                              lg: 'calc(33.33% - 16px)',
                              xl: 'calc(25% - 18px)',
                            },
                          }}
                        >
                          <ProductCard key={item.id} item={item} />
                        </Box>
                      ))}
                    </ProductsContainer>
                    {pagesCount > pageOne && (
                      <StyledPagination
                        count={pagesCount}
                        page={page}
                        handleChange={handleChange}
                      />
                    )}
                  </ProductsContainerWrapper>
                ) : (
                  <RegularText>{t('vendorProfile.noProducts')}</RegularText>
                )}
              </>
            )}
          </Container>
        </MainContainerWrapper>
      )}

      <Footer />
    </Container>
  );
}

export default VendorPublicProfilePage;
