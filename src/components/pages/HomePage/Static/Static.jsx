import React from 'react'
import Example from '../../../../assets/photos/driller.png'
import './Static.css'

const Static = () => {

    const setup = [
        {
            statusColor: '',
            statusFontColor: '',
            bgc: '#ffba06',
            color: '#000',
            status: '',
            title: 'DeWalt Decker Compressore',
            desc: 'Starting From',
            price: '349',
            src: Example,
            alt: 'tool'
        },
        {
            statusColor: '#f35c04',
            statusFontColor: '#fff',
            bgc: '#e4f2fb',
            color: '#000',
            status: 'New',
            title: 'GARDENA Comfort Watering Pump',
            desc: 'Lowest Price',
            price: '49',
            src: Example,
            alt: 'tool'
        },
        {
            statusColor: '#fff',
            statusFontColor: '#000',
            bgc: '#f35c04',
            color: '#fff',
            status: 'New',
            title: 'BISON Professional 450g Claw Hammer',
            desc: 'Lowest Price!',
            price: '149',
            src: Example,
            alt: 'tool'
        },
    ]

    return (
        <div className='HomePage_static__main'>
            {setup.map((item, index) => (
                <div className='item' key={index} style={{ backgroundColor: `${item.bgc}`, color: `${item.color}` }}>
                    <div className="left_hand">
                        <span className={`status ${item.status}`} style={{ backgroundColor: `${item.statusColor}`, color: `${item.statusFontColor}` }}>{item.status}</span>
                        <p>{item.title}</p>
                        <p>{item.desc}</p>
                        <p>{item.price}</p>
                    </div>
                    <div className="right_hand">
                        <img src={item.src} alt={item.alt} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Static