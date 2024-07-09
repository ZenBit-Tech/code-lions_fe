import Container from 'src/components/shared/Container';

import Announcement from './Announcement';
import CategoriesSlider from './CategoriesSlider';
import Products from './Products';

function HomePage() {
  return (
    <Container>
      <Announcement />
      <CategoriesSlider />
      <Products />
    </Container>
  );
}

export default HomePage;
