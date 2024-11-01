import React from 'react'
import './TargetSlide.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./TargetSlide.css";
import data from './TargetSlideStore';

const TargetSlide = () => {
  const [lang] = React.useState(localStorage.getItem('lang') || 'hy');

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy;
  };

  return (
    <div className='HomePage_TargetSlide_main'>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation]}
        simulateTouch={true}
        touchRatio={1}
        grabCursor={true}
        breakpoints={{
          1600: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 4,
          },
          600: {
            slidesPerView: 2,
          },
          300: {
            slidesPerView: 1,
          },
        }}
        className="product-swiper"
      >
        {data.map((obj, id) => (
          <SwiperSlide key={id} className="item" style={{ padding: '10px 0' }}>
            <div key={id} style={{ display: 'flex' }}>
              {obj.icon}
              <div style={{ marginLeft: '20px' }}>
                <p>
                  {handleGetData(lang, [obj.heading_en, obj.heading_ru, obj.heading_hy])}
                </p>
                <p>
                  {handleGetData(lang, [obj.description_en, obj.description_ru, obj.description_hy])}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default TargetSlide