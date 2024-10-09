import React, { useEffect, useState } from 'react';
import Slide from './Slides/Slide';
import TargetSlide from './TargetSlide/TargetSlide';
import TopSuggestions from './TopSuggestions/TopSuggestions';
import Filter from './Filter/Filter';
import Products from './Products/Products';
import Static from './Static/Static';
import Comments from './Comments/Comments';
import Map from '../../Map';
import './HomePage.css';

const HomePage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY); // Check scroll position
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home_main_container">
      <Slide />
      <TargetSlide />
      <TopSuggestions />
      <div style={{ display: 'flex' }}>
        <Filter />
        <Products />
      </div>
      <Static />
      <Comments />
      <Map />

      {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑ Top
        </button>
      )}
    </div>
  );
};

export default HomePage;
