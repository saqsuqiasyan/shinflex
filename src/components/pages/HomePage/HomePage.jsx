import React from 'react'
import Slide from './Slides/Slide'
import TargetSlide from './TargetSlide/TargetSlide'
import TopSuggestions from './TopSuggestions/TopSuggestions'
import Filter from './Filter/Filter'
import Products from './Products/Products'
import Static from './Static/Static'
import Comments from './Comments/Comments'
import Map from '../../Map'

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
      <Static />
      <Comments />
      <Map />
    </div>
  )
}

export default HomePage