import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import Special from '../categoriesHovers/special/special';
import AOS from 'aos';

const SpecialX = () => {
    const [hover, setHover] = useState(false);
    const hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
        setHover(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setHover(false);
        }, 200);
    };

    useEffect(() => {
        AOS.init({
            duration: 300,
            once: true,
        });
    }, []);

    return (
        <>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ position: 'relative', height: '100%', lineHeight: '60px' }}
            >
                <Link to='/collections/sale-collection' style={{ color: '#000', textDecoration: 'none' }} onClick={() => setHover(false)}>
                    Special
                </Link>
                <span className='sale'>sale</span> <IoIosArrowDown className='arrow' style={{ marginTop: '20px' }} />

                {hover && (
                    <div className='special_main' data-aos="fade-in">
                        <Special />
                    </div>
                )}
            </div>
        </>
    )
}

export default SpecialX