import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Example from '../../../../assets/photos/driller.png'
import './Elements.css'

const Element = () => {
  const [hideTools, setHideTools] = useState(false);

  const urls = [
    {
      title: 'About Us',
      url: '/pages/about-us'
    },
    {
      title: 'Blogs',
      url: '/blogs/news'
    },
    {
      title: 'Contact',
      url: '/pages/contact'
    },
    {
      title: 'FAQ',
      url: '/pages/faqs'
    },
    {
      title: 'Compare',
      url: '/pages/compare'
    },
    {
      title: 'Wishlist',
      url: '/pages/wishlist'
    }
  ]

  return (
    <div className='ElementsMain' style={hideTools ? { display: 'none' } : {}} data-aos="fade-in">
      {urls.map((obj, id) => (
        <p key={id} onClick={() => setHideTools(true)}><Link style={{ color: 'inherit', textDecoration: 'none' }} to={obj.url}>{obj.title}</Link></p>
      ))}
    </div>
  )
}

export default Element