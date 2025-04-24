// SwiperComponent.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide1 from "../../assets/Slide1.jpg";
import Slide2 from "../../assets/Slide2.jpg";
import Slide3 from "../../assets/Slide3.jpg";
import Slide4 from "../../assets/Slide4.jpg";
import Slide5 from "../../assets/Slide5.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required Swiper modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const SwiperComponent: React.FC = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: false,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper content-center justify-center"
    >
      <SwiperSlide>
        <img
          src={Slide1}
          alt="Slide 1"
          className="w-full h-auto object-cover rounded-l-lg"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={Slide2}
          alt="Slide 2"
          className="w-full h-auto object-cover rounded-l-lg"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={Slide3}
          alt="Slide 3"
          className="w-full  h-auto object-cover rounded-l-lg"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={Slide4}
          alt="Slide 4"
          className="w-full  h-auto object-cover rounded-l-lg"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={Slide5}
          alt="Slide 5"
          className="w-full h-auto object-cover rounded-l-lg"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperComponent;
