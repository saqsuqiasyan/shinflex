import React, { useState } from 'react'
import Example from '../../../../assets/photos/11_03.webp'
import './topDeals.css'
import { Link } from 'react-router-dom'

const TopDeals = () => {
    const [hideTools, setHideTools] = useState(false);

    const urls = ['Drillers', 'Hammers', 'Batteries', 'Cutter', 'Power Tools', 'Accessories', 'Hand Tools', 'Multi Tools']

    return (
        <div className='top_deals_container' style={hideTools ? { display: 'none' } : {}} data-aos="fade-in">
            <div className="left_hand">
                <p>shop by</p>
                <div className="shop_by_items">
                    {urls.map((el, i) => (
                        <div className="item" key={i}>
                            <img src={Example} alt="Tool" />
                            <p onClick={() => setHideTools(true)}><Link to={`/collections/${el.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{el}</Link></p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="right_hand">

            </div>
        </div>
    )
}

export default TopDeals