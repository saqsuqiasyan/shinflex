import React, { useState } from 'react'
import Example from '../../../../assets/photos/11_03.webp'
import './topDeals.css'
import { Link } from 'react-router-dom'
import { IoStar } from 'react-icons/io5'

const TopDeals = () => {
    const [hideTools, setHideTools] = useState(false);

    const urls = ['Drillers', 'Hammers', 'Batteries', 'Cutter', 'Power Tools', 'Accessories', 'Hand Tools', 'Multi Tools']

    return (
        <div className='top_deals_container' style={hideTools ? { display: 'none' } : {}} data-aos="fade-in">
            <div className="left_hand">
                <p>shop by</p>
                <div className="shop_by_items">
                    {urls.map((el, i) => (
                        <div className="item" key={i} onClick={() => setHideTools(true)}>
                            <img src={Example} alt="Tool" />
                            <p onClick={() => setHideTools(true)}><Link to={`/collections/${el.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{el}</Link></p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="right_hand">
                <p>Cutters</p>
                <div className="items">
                    {new Array(6).fill(null).map((_, id) => (
                        <div className="item" onClick={() => setHideTools(true)}>
                            <img src={Example} alt="tool" />
                            <div className="toolInfo">
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, delectus.</p>
                                <div className="rating">
                                    {new Array(5).fill(null).map((_, index) =>
                                        <IoStar key={index} className='rating_icon' style={{ marginRight: '3px', cursor: 'pointer' }} />)
                                    }
                                    <span className='rating_number'>(0)</span>
                                </div>
                                <p className="price">1.00</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopDeals