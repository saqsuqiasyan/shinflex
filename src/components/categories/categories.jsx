import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import './categories.css';
import { IoIosArrowDown } from "react-icons/io";
import { PiSealPercentLight } from "react-icons/pi";
import 'aos/dist/aos.css';
import BrowseCategoriesX from './X/BrowseCategoriesX.jsx'
import OurStoreX from './X/OurStoreX.jsx';
import SpecialX from './X/SpecialX.jsx';
import CategoriesX from './X/CategoriesX.jsx';
import TopDealsX from './X/TopDealsX.jsx';

const Categories = () => {

  return (
    <div className='categories_main__wrapper'>
      <BrowseCategoriesX />

      <div className="more_categories">
        <div className='categories__container'>
          <li>
            <Link to='/' style={{ color: '#000', textDecoration: 'none' }}>Home</Link>
          </li>

          <OurStoreX />

          <SpecialX />

          <CategoriesX />

          <TopDealsX />

          <li style={{ position: 'relative' }}>Elements <IoIosArrowDown className='arrow' /></li>
        </div>
      </div>

      <div className="top_offers">
        <PiSealPercentLight className='toolsIcon' />
        <p className='topOffer'>Top Offers</p>
      </div>
    </div>
  );
};

export default Categories;
