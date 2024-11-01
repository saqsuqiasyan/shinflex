import { TbTruckDelivery } from "react-icons/tb";
import { GoGift } from "react-icons/go";
import { TfiHeadphoneAlt, TfiMobile } from "react-icons/tfi";
import { HiOutlineCreditCard } from "react-icons/hi2";

const data = [
  {
    icon: <TbTruckDelivery size={40} className='icon' />,
    heading_hy: 'Անվճար առաքում',
    heading_ru: 'Бесплатная доставка',
    heading_en: 'Free delivery',
    description_hy: '5000դր և ավել գնման դեպքում',
    description_ru: '5000р и более сроком оформления заказа',
    description_en: '5000$ and more order duration'
  },
  {
    icon: <GoGift size={40} className='icon' />,
    heading_hy: 'Գնված ապրանքի',
    heading_ru: 'Купленного товара',
    heading_en: 'Bought product',
    description_hy: 'վերադարձ 14 օրվա ընթացքում',
    description_ru: 'возвращение за 14 дней',
    description_en: 'return during 14 days'
  },
  {
    icon: <TfiHeadphoneAlt size={40} className='icon' />,
    heading_hy: 'Օնլայն աջակցություն',
    heading_ru: 'Онлайн консультации',
    heading_en: 'Online consultations',
    description_hy: '24/7 ռեժիմով',
    description_ru: '24/7 обратные взаимодействия',
    description_en: '24/7 customer support'
  },
  {
    icon: <TfiMobile size={40} className='icon' />,
    heading_hy: 'Ճկուն վճարում',
    heading_ru: 'Гибкая оплата',
    heading_en: 'Flexible payment',
    description_hy: 'Վճարեք Ձեզ հարմար եղանակով',
    description_ru: 'Оплата наличными или картой',
    description_en: 'Payment by cash or card'
  },
  {
    icon: <HiOutlineCreditCard size={40} className='icon' />,
    heading_hy: 'Քարտով վճարման դեպքում',
    heading_ru: 'Оплата наличными или картой',
    heading_en: 'Payment by cash or card',
    description_hy: 'Անվճար առաքում սկսած 5000դր․',
    description_ru: '5000р и более сроком оформления заказа',
    description_en: '5000$ and more order duration'
  }
]

export default data;