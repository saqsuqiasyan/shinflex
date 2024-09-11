import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Example from '../../../../assets/photos/11_03.webp'
import { IoStar } from 'react-icons/io5'
import './Categories.css'

const Categories = () => {
    const [hideTools, setHideTools] = useState(false)

    const CategoriesLinks = [
        ['Accessories', 'Batteries', 'Cable Reels', 'Chargers', 'Hammers'],
        ['Cutter', 'Bits', 'Work Apparel', 'Tool Accessories', 'Abrasives'],
        ['Drillers', 'Core Drill', 'Drill Drivers', 'Hammer Drills', 'Impact Drills'],
        ['Cutter Tools', 'Cable Cutters', 'Mitre Clamps', 'Scissors', 'Multi Tools'],
        ['Pounding', 'Electric Power', 'Washers', 'Cordless Tools', 'Nailers'],
        ['Power Tools', 'Pliers Sockets', 'Prying', 'Wrenches', 'Snips'],
    ]

    const sidesMapping = (store) => {
        return store.map((el, id) => (
            <p key={id}><Link style={id === 0 ? { color: 'inherit', textDecoration: 'none', fontSize: '18px' } : { color: 'inherit', textDecoration: 'none', fontWeight: 'normal' }} to={`/categories/${el.toLowerCase().replace(' ', '-')}`}>{el}</Link></p>
        ))
    }

    return (
        <div className='categories_nav_main' style={hideTools ? { display: 'none' } : {}} data-aos="fade-in">
            <div className="left_hand">
                {CategoriesLinks.map((_, id) => (
                    <div key={id} className='child' onClick={() => setHideTools(true)}>
                        {sidesMapping(CategoriesLinks[id])}
                    </div>
                ))}
            </div>

            <div className="right_hand">
                <p className="best_selling">Best Selling</p>

                <div className="items">
                    {new Array(4).fill(null).map((_, id) => (
                        <div className="item" key={id}>
                            <div className="image">
                                <img src={Example} alt="Tool" />
                            </div>
                            <div className="stats">
                                <p className="name" onClick={() => setHideTools(true)}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing.
                                </p>
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

export default Categories