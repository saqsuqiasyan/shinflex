import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom'
import OurStore from '../categoriesHovers/ourStore/ourStore';
import AOS from 'aos';

const OurStoreX = () => {
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
                className="store_categories"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ height: '100%', lineHeight: '60px' }}
            >
                <Link to='/our-store' style={{ color: '#000', textDecoration: 'none' }} onClick={() => setHover(false)}>
                    Our Store <IoIosArrowDown className='arrow' />
                </Link>
                {hover && (
                    <OurStore />
                )}
            </div>
        </>
    );
}

export default OurStoreX;
