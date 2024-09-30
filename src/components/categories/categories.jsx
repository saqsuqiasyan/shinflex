import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './categories.css';
import { PiSealPercentLight } from "react-icons/pi";
import 'aos/dist/aos.css';
import BrowseCategoriesX from './X/BrowseCategoriesX.jsx'
import OurStoreX from './X/OurStoreX.jsx';
import SpecialX from './X/SpecialX.jsx';
import CategoriesX from './X/CategoriesX.jsx';
import TopDealsX from './X/TopDealsX.jsx';
import ElementsX from './X/ElementsX.jsx';
import { FiSearch } from 'react-icons/fi';
import Loading from '../loading/Loading.jsx'

const Categories = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang] = useState(localStorage.getItem('lang') || 'hy');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://shinflex.am/SFApi/Header/?format=json');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data || !data[0]) {
    return <div>No data available</div>;
  }
  console.log(data);

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy
  }

  return (
    <div className='categories_main__wrapper'>
      <BrowseCategoriesX label={handleGetData(lang, [data[0].browse_name_en, data[0].browse_name_ru, data[0].browse_name_hy])} />

      <div className="more_categories">
        <div className='categories__container'>
          <li>
            <Link to='/' style={{ color: '#000', textDecoration: 'none' }}>{handleGetData(lang, [data[0].home_name_en, data[0].home_name_ru, data[0].home_name_hy])}</Link>
          </li>
          <OurStoreX />
          <SpecialX label={handleGetData(lang, [data[0].special_name_en, data[0].special_name_ru, data[0].special_name_hy])} />
          <CategoriesX />
          <TopDealsX />
          <ElementsX />
        </div>
      </div>

      <div className='searchItem'>
        <input type="text" placeholder='Որոնել' />
        <FiSearch className='searchIcon' />
      </div>

      <div className="top_offers">
        <PiSealPercentLight className='toolsIcon' />
        <p className='topOffer'>Top Offers</p>
      </div>
    </div>
  );
};

export default Categories;
