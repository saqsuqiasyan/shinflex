import React, { useState, useEffect, useRef } from 'react';
import './categories.css';
import { IoMenu } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { PiSealPercentLight } from "react-icons/pi";
import BrowseCategories from './categoriesHovers/browseCategories/browseCategories';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Categories = () => {
  const [hover, setHover] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
    setHover(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setHover(false);
    }, 200);
  };

  useEffect(() => {
    AOS.init({
      duration: 300,
      once: true,
    });
  }, []);

  return (
    <div className='categories_main__wrapper'>
      <div
        className="browse_categories"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <IoMenu className='menu_icon' />
        <p>Browse Categories</p>
        {hover && (
          <div
            className='browseCategories_main'
            data-aos="fade-in"
          >
            <BrowseCategories />
          </div>
        )}
      </div>

      <div className="more_categories">
        <ul>
          <li>Home</li>
          <li>Our Store <IoIosArrowDown className='arrow' /></li>
          <li>Special <span className='sale'>sale</span> <IoIosArrowDown className='arrow' /></li>
          <li>Categories <span className='sale' id='hot'>hot</span> <IoIosArrowDown className='arrow' /></li>
          <li>Top Deals <IoIosArrowDown className='arrow' /></li>
          <li>Elements <IoIosArrowDown className='arrow' /></li>
        </ul>
      </div>

      <div className="top_offers">
        <PiSealPercentLight className='toolsIcon' />
        <p className='topOffer'>Top Offers</p>
      </div>
    </div>
  );
};

export default Categories;
