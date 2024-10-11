import React from 'react'
import { IoStar } from "react-icons/io5";
import User from '../../../../assets/photos/developer.png'
import './Comments.css'

const Comments = () => {
    return (
        <div className='HomePage_comments__main'>
            <h2>What Our Customers Says!</h2>
            <div className="items">
                {new Array(4).fill(null).map((_, idx) => (
                    <div className="item" key={idx}>
                        <div className="rating">
                            {new Array(5).fill(null).map((_, starIdx) => <IoStar key={starIdx} />)}
                        </div>
                        <div className="text">
                            <p>Pair text with an image to focus on your chosen
                                product, collection, or blog post. Add details on
                                availability, style, or even provide a review.</p>
                        </div>
                        <div className="sender">
                            <img src={User} alt="user" />
                            <div>
                                <h2>John Due</h2>
                                <span>Developer</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comments