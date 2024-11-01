import React, { useEffect, useRef, useState } from 'react'
import { IoMenu } from "react-icons/io5";
import BrowseCategories from '../categoriesHovers/browseCategories/browseCategories'
import AOS from 'aos';

const BrowseCategoriesX = () => {
    const [hover, setHover] = useState(false);
    const hoverTimeout = useRef(null);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Header/");
                const result = await response.json();
                setData(result[0]);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

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
            duration: 200,
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
            <p>{handleGetData(lang, [data.browse_name_en, data.browse_name_ru, data.browse_name_hy])}
            </p>
            {hover && (
                <div
                    className='browseCategories_main'
                    data-aos="fade-up"
                >
                    <BrowseCategories />
                </div>
            )}
        </div>
    )
}

export default BrowseCategoriesX