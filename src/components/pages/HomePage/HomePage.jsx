import React, { useEffect, useState } from 'react';
import Slide from './Slides/Slide';
import TargetSlide from './TargetSlide/TargetSlide';
import TopSuggestions from './TopSuggestions/TopSuggestions';
import Static from './Static/Static';
import Map from '../../Map';
import './HomePage.css';
import FilteredModule from '../../FilteredModule';

const HomePage = () => {
  return (
    <div className="home_main_container">
      <Slide />
      <TargetSlide />
      <TopSuggestions />
      <FilteredModule />
      <Static />
      <Map />
    </div>
  );
};

export default HomePage;
