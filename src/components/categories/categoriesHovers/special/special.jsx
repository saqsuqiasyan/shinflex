import React, { useState } from 'react'
import Example from '../../../../assets/photos/11_03.webp'
import './special.css'
import { IoStar } from "react-icons/io5";

const Special = () => {
    const [hideTools, setHideTools] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 7;
    const items = new Array(10).fill(null);

    const handleNext = () => {
        if (currentIndex < items.length - itemsToShow) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="special_main" style={hideTools ? { display: 'none' } : {}} data-aos="fade-up">
            <div className='special_category_main' >
                <button className="prev_btn" onClick={handlePrev}>&lt;</button>
                <ul className="special_category_card" style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
                    {items.map((_, key) => (
                        <li key={key} className="special_category_card_item">
                            <div className="card_item_img_container">
                                <img src={Example} alt="Tool" />
                            </div>
                            <p className='card_item_name' onClick={() => setHideTools(true)}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, minus.</p>

                            <div className="rating">
                                {new Array(5).fill(null).map((_, index) =>
                                    <IoStar key={index} className='rating_icon' style={{ marginRight: '3px' }} />)
                                }
                                <span className='rating_number'>(0)</span>
                            </div>
                            <p className="price">1.00</p>
                            <button className="add_to_cart_btn">Add to cart</button>
                        </li>
                    ))}
                </ul>
                <button className="next_btn" onClick={handleNext}>&gt;</button>
            </div>
        </div>
    )
}

export default Special;