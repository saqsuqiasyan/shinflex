import React from 'react'
import './TargetSlide.css'
import { TbTruckDelivery } from "react-icons/tb";
import { GoGift } from "react-icons/go";
import { TfiHeadphoneAlt, TfiMobile } from "react-icons/tfi";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./TargetSlide.css";

const TargetSlide = () => {

  const items = [
    {
      icon: <TbTruckDelivery size={40} className='icon' />,
      heading: 'Անվճար առաքում',
      description: '5000դր և ավել գնման դեպքում'
    },
    {
      icon: <GoGift size={40} className='icon' />,
      heading: 'Գնված ապրանքի',
      description: 'վերադարձ 14 օրվա ընթացքում'
    },
    {
      icon: <TfiHeadphoneAlt size={40} className='icon' />,
      heading: 'Օնլայն աջակցություն',
      description: '24/7 ռեժիմով'
    },
    {
      icon: <TfiMobile size={40} className='icon' />,
      heading: 'Ճկուն վճարում',
      description: 'Վճարեք Ձեզ հարմար եղանակով'
    },
    {
      icon: <HiOutlineCreditCard size={40} className='icon' />,
      heading: 'Քարտով վճարման դեպքում',
      description: 'Անվճար առաքում սկսած 5000դր․'
    }
  ]

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
        {items.map((obj, id) => (
          <SwiperSlide key={id} className="item" style={{ padding: '10px 0' }}>
            <div key={id} style={{ display: 'flex' }}>
              {obj.icon}
              <div style={{ marginLeft: '20px' }}>
                <p>{obj.heading}</p>
                <p>{obj.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default TargetSlide