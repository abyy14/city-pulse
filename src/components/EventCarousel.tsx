// EventCarousel.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  images: { url: string }[];
};

export default function EventCarousel({ images }: Props) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ type: 'progressbar' }}
      spaceBetween={20}
      slidesPerView={1}
      //style={{ borderRadius: '12px', overflow: 'hidden' }}
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
            <img
              src={img.url}
              alt={`slide-${idx}`}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
