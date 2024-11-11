import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "./TopSuggestions.css";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const TopSuggestions = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [isEntered, setIsEntered] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Product/");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setShow(data.some(item => item.sale));
    }, [data]);

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    const handleProductClick = (product) => {
        navigate('/product-details', { state: product });
    };

    return (
        <div className="slider-container" id="sale-collection">
            {show && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ marginBottom: '12px' }}>{handleGetData(lang, ['TOP OFFERS!', 'ТОП ПРЕДЛОЖЕНИЯ!', 'ԹՈՓ ԱՌԱՋԱՐԿՆԵՐ'])}</h2>
                <div className="slider-buttons" style={{ marginBottom: '14px' }}>
                    <button className="prev-btn"><MdOutlineKeyboardArrowLeft style={{ fontSize: '20px', fontWeight: 'bold' }} /></button>
                    <button className="next-btn"><MdOutlineKeyboardArrowRight style={{ fontSize: '20px', fontWeight: 'bold' }} /></button>
                </div>
            </div>}
            <Swiper
                spaceBetween={10}
                slidesPerView={4}
                navigation={{
                    prevEl: ".prev-btn",
                    nextEl: ".next-btn",
                }}
                modules={[Navigation]}
                simulateTouch={true}
                touchRatio={1}
                grabCursor={true}
                breakpoints={{
                    1500: {
                        slidesPerView: 7,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    500: {
                        slidesPerView: 2,
                    },
                    300: {
                        slidesPerView: 1,
                    }
                }}
                className="product-swiper"
            >
                {data.map((product, id) => (
                    product.sale &&
                    <SwiperSlide key={id}>
                        <div className="product-card" onClick={() => handleProductClick(product)} onMouseEnter={() => setIsEntered(id)} onMouseLeave={() => setIsEntered(null)}>
                            <div className="product-discount">-{product.discount_procent}%</div>
                            <div className="img_cont">
                                <img src={isEntered === id ? product.img2 : product.img1} alt={handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])} className="product-image" />
                            </div>
                            <h3>{handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])}</h3>
                            <div className="product-price">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '20px', color: '#df3030', fontWeight: 'bold' }}>{parseInt(product.price) * ((100 - product.discount_procent) / 100)}դր․</span>
                                    <span style={{ marginRight: '15px', color: '#006FCF' }}>{product.count > 0 ? handleGetData(lang, ['Available', 'Доступнo', 'Առկա է']) : handleGetData(lang, ['Unavailable', 'Недоступнo', 'Առկա չէ'])}</span>
                                </div>
                                <span className="old-price">{parseInt(product.price)}դր․</span>
                            </div>
                            <button className="add-to-cart">
                                {handleGetData(lang, ['Add to cart', 'Добавить', 'Ավելացնել'])}
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopSuggestions;