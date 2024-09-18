import React from 'react'
import Example from '../../../../assets/photos/home-slider-01.jpg.png'
import Tool from '../../../../assets/photos/driller.png'
import './Slide.css'

const Slide = () => {
    return (
        <div className='HomePage_slide'>
            <div className="left_hand">
                <img src={Example} alt="slider" />
                <div className="info">
                    <p>25% ԶԵՂՉ</p>
                    <p>Հատուկ առաջարկ<br />
                        ՔԵԶ համար</p>
                    <p>Թեժ գին</p>
                    <p>24․900դր․</p>
                    <button>ԳՆԵԼ</button>
                </div>
            </div>
            <div className="right_hand">
                {new Array(2).fill(null).map((_, id) => (
                    <div className="item" key={id}>
                        <div className="info">
                            <p>Max Lithium Cordless Drill</p>
                            <p>Weekly Offers</p>
                            <p>1000դր․</p>
                        </div>
                        <img src={Tool} alt="tool" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slide