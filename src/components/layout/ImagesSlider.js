import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ImagesSlider({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = () => {
    if (thumbsSwiper) {
      setActiveIndex(thumbsSwiper.clickedIndex);
    }
  };
  return (
    <>
      <Swiper
        // style={{
        //   "--swiper-navigation-color": "#fff",
        //   "--swiper-pagination-color": "#fff",
        // }}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Thumbs]}
        className="mySwiper2"
        onSwiper={(swiper) =>
          swiper.thumbs.swiper && setThumbsSwiper(swiper.thumbs.swiper)
        }
        onSlideChange={handleSlideChange}
      >
        {images &&
          images.map((el, index) => (
            <SwiperSlide key={index}>
              <img src={el} alt={`slide ${index}`} />

              {/* <Image src={el} alt={`slide ${index}`} width={1000} height={600} /> */}
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="mt-2"></div>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        onSlideChange={handleSlideChange}
      >
        {images &&
          images.map((el, index) => (
            <SwiperSlide key={index}>
              <div
                style={{ opacity: activeIndex === index ? 0.5 : 1 }}
                className="cursor-pointer"
              >
                <img src={el} alt={`slide ${index}`} />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
