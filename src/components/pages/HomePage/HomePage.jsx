import React from 'react'
import './HomePage.css'
import Slide from './Slides/Slide'
import TargetSlide from './TargetSlide/TargetSlide'
import TopSuggestions from './TopSuggestions/TopSuggestions'
import Filter from './Filter/Filter'
import Products from './Products/Products'

const HomePage = () => {
  return (
    <div>
      <Slide />
      <TargetSlide />
      <TopSuggestions />
      <div style={{ display: 'flex' }}>
        <Filter />
        <Products />
      </div>
    </div>
  )
}

export default HomePage