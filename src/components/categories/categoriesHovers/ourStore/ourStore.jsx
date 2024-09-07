import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Driller from '../../../../assets/photos/driller.png'
import './ourStore.css'

const OurStore = () => {
    const [hideTools, setHideTools] = useState(false)

    const airTools = ['Air Tools', 'Pipe Cutters', 'Air Compressors', 'Grinding Air Tools', 'Pneumatic Impact', 'Angle Grinders']

    const handTools = ['Hand Tools', 'Straight Grinders', 'Hand Measure', 'Pliers & Cutters', 'Screwdrivers', 'SDS-Plus Drill']

    const sidesMapping = (store) => {
        return store.map((el, id) => (
            <p key={id}><Link style={id === 0 ? { color: '#000', textDecoration: 'none', fontSize: '18px' } : { color: '#000', textDecoration: 'none', fontWeight: 'normal' }} to={`/collections/${el === 'Pliers & Cutters' ? 'pliers-cutters' : el.toLowerCase().replace(' ', '-')}`}>{el}</Link></p>
        ))
    }

    return (
        <div className='ourStoreMain' style={hideTools ? { display: 'none' } : {}} data-aos="fade-in">
            <div className="side_left" onClick={() => setHideTools(true)}>
                <div className="left_side_child">
                    {sidesMapping(airTools)}
                </div>
                <div className="left_side_child">
                    {sidesMapping(handTools)}
                </div>
            </div>
            <div className="side_right">
                <div className='sale_driller_left'>
                    <div className="sale_text_info">
                        <p style={{ backgroundColor: '#fff', padding: '5px', textTransform: 'uppercase', display: 'inline', fontWeight: 'normal', borderRadius: '4px', lineHeight: '16px' }}>offer</p>
                        <p style={{ fontSize: '23px', lineHeight: '1.2' }}>Flat 80% OFF</p>
                    </div>
                    <div className="sale_driller_photo">
                        <img src={Driller} alt="driller" />
                    </div>
                </div>
                <div className='sale_driller_right'>
                    <div className="sale_text_info" style={{ marginLeft: '20px' }}>
                        <p style={{ backgroundColor: '#fff', padding: '5px', textTransform: 'uppercase', display: 'inline', fontWeight: 'normal', borderRadius: '4px', lineHeight: '16px' }}>special offer</p>
                        <p style={{ fontSize: '23px', lineHeight: '1.2' }}>Up to 30% OFF</p>
                    </div>
                    <div className="sale_driller_photo" style={{ width: '30%', height: '90%' }}>
                        <img src={Driller} alt="driller" style={{ width: '100%', height: '90%' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurStore