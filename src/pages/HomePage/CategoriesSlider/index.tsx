import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Slider, { CustomArrowProps } from 'react-slick';

import { Box } from '@mui/material';

import ArrowLeftIcon from 'src/assets/icons/arrow-left-slider.svg';
import ArrowRightIcon from 'src/assets/icons/arrow-right-slider.svg';
import accessoriesImg from 'src/assets/photos/categories/accessories.jpg';
import bagsImg from 'src/assets/photos/categories/bag.jpg';
import clothingImg from 'src/assets/photos/categories/clothing.jpg';
import designersImg from 'src/assets/photos/categories/designers.jpg';
import shoesImg from 'src/assets/photos/categories/shoes.jpg';
import { urls } from 'src/common/constants';

import {
  CategoryWrapper,
  CategoryImage,
  NextArrowWrapper,
  PrevArrowWrapper,
  SliderTitle,
  CategoryTitile,
} from './styles';

function NextArrow(props: CustomArrowProps) {
  const { onClick } = props;

  return (
    <NextArrowWrapper onClick={onClick}>
      <ArrowLeftIcon />
    </NextArrowWrapper>
  );
}

function PrevArrow(props: CustomArrowProps) {
  const { onClick } = props;

  return (
    <PrevArrowWrapper onClick={onClick}>
      <ArrowRightIcon />
    </PrevArrowWrapper>
  );
}

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const categories = [
  { name: 'Accessories', image: accessoriesImg, slug: 'accessories' },
  { name: 'Bags', image: bagsImg, slug: 'bags' },
  { name: 'Clothing', image: clothingImg, slug: 'clothing' },
  { name: 'Shoes', image: shoesImg, slug: 'shoes' },
  { name: 'Designers', image: designersImg, slug: 'designers' },
];

function CategoriesSlider() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        mt: '40px',
        maxWidth: '1336px',
        mx: 'auto',
        marginBottom: '100px',
      }}
    >
      <SliderTitle variant="h5">{t('home.categories')}</SliderTitle>
      <Slider {...settings}>
        {categories.map((category) => (
          <CategoryWrapper key={category.name}>
            <Link to={`${urls.PRODUCT_CATEGORY_URL}/${category.slug}`}>
              <CategoryImage src={category.image} alt={category.name} />
            </Link>
            <Link to={`${urls.PRODUCT_CATEGORY_URL}/${category.slug}`}>
              <CategoryTitile>{category.name}</CategoryTitile>
            </Link>
          </CategoryWrapper>
        ))}
      </Slider>
    </Box>
  );
}

export default CategoriesSlider;
