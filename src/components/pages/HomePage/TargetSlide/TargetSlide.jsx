import React from 'react'
import './TargetSlide.css'
import { TbTruckDelivery } from "react-icons/tb";
import { GoGift } from "react-icons/go";
import { TfiHeadphoneAlt, TfiMobile } from "react-icons/tfi";

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
    }
  ]

  return (
    <div className='HomePage_TargetSlide_main'>
      {items.map((obj, id) => (
        <div className="item" key={id}>
          {obj.icon}
          <div>
            <p>{obj.heading}</p>
            <p>{obj.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TargetSlide