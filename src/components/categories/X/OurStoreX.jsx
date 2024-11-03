import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom'
import OurStore from '../categoriesHovers/ourStore/ourStore';
import AOS from 'aos';

const OurStoreX = () => {
    const [data, setData] = useState([]);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/OurStore/");
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

    const scrollToSaleCollection = () => {
        const saleCollectionElement = document.getElementById('all-products');
        if (saleCollectionElement) {
            saleCollectionElement.scrollIntoView({ behavior: 'smooth' });
        }
        setHover(false)
    };

    return (
        <>
            <div
                className="store_categories"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ height: '100%', lineHeight: '60px', cursor: 'pointer' }}
            >
                <p style={{ color: '#000' }} onClick={scrollToSaleCollection}>{handleGetData(lang, [data.name_en, data.name_ru, data.name_hy])} <IoIosArrowDown className='arrow' />
                </p>
                {hover && (
                    <OurStore />
                )}
            </div>
        </>
    );
}

export default OurStoreX;
