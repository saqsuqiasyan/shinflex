import React, { useEffect, useRef, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import BrowseCategories from '../categoriesHovers/browseCategories/browseCategories'
import AOS from 'aos';

const BrowseCategoriesX = ({ label }) => {
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
        <div
            className="browse_categories"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <IoMenu className='menu_icon' />
            <p>{label}</p>
            {hover && (
                <div
                    className='browseCategories_main'
                    data-aos="fade-in"
                >
                    <BrowseCategories />
                </div>
            )}
        </div>
    )
}

export default BrowseCategoriesX