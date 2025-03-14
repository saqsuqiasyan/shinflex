import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Categories from '../categoriesHovers/categories/Categories';

const CategoriesX = () => {
    const [hover, setHover] = useState(false);
    const hoverTimeout = useRef(null);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Category/");
                const result = await response.json();
                setData(result[2]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en'? en : lang === 'ru'? ru : hy;
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
                <Link to='/collections/sale-collection/_' style={{ color: '#000', textDecoration: 'none' }} onClick={() => setHover(false)}>
                    {handleGetData(lang, [data?.name_en, data?.name_ru, data?.name_hy])}
                </Link>
                <span className='sale' id='hot'>hot</span> <IoIosArrowDown className='arrow' style={{ marginTop: '20px' }} />
                {hover && (
                    <Categories />
                )}
            </div>
        </>
    )
}

export default CategoriesX