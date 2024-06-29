import { Box, IconButton, Modal } from '@mui/material';

import CloseIcon from 'src/assets/icons/profile/close-black.svg';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import './swiperStyles.css';
import style from './styles';

interface IProductSliderModalProps {
  open: boolean;
  handleClose: () => void;
  images: string[];
}

function ProductSliderModal({
  open,
  handleClose,
  images,
}: IProductSliderModalProps) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style.modalContentWrapper} onClick={(e) => e.stopPropagation()}>
        <IconButton sx={style.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Swiper navigation modules={[Navigation]} className="swiper-wrapper">
          {images.map((image, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <Box
                component="img"
                src={image}
                alt={`Slide ${index}`}
                sx={style.slideWrapper}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Modal>
  );
}

export default ProductSliderModal;
