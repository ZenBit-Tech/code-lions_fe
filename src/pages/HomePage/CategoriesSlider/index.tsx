import { useTranslation } from 'react-i18next';
import Slider, { CustomArrowProps } from 'react-slick';

import { Box } from '@mui/material';

import ArrowLeftIcon from 'src/assets/icons/arrow-left-slider.svg';
import ArrowRightIcon from 'src/assets/icons/arrow-right-slider.svg';
import accessoriesImg from 'src/assets/photos/categories/accessories.jpg';
import bagsImg from 'src/assets/photos/categories/bag.jpg';
import clothingImg from 'src/assets/photos/categories/clothing.jpg';
import designersImg from 'src/assets/photos/categories/designers.jpg';
import shoesImg from 'src/assets/photos/categories/shoes.jpg';

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
  { name: 'Accessories', image: accessoriesImg },
  { name: 'Bags', image: bagsImg },
  { name: 'Clothing', image: clothingImg },
  { name: 'Shoes', image: shoesImg },
  { name: 'Designers', image: designersImg },
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
            <CategoryImage src={category.image} alt={category.name} />
            <CategoryTitile>{category.name}</CategoryTitile>
          </CategoryWrapper>
        ))}
      </Slider>
    </Box>
  );
}

export default CategoriesSlider;
