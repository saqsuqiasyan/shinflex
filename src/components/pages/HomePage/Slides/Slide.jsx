import React, { useEffect, useState } from 'react';
import './Slide.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Slide = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Slayder/?format=json");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    return (
        <div className='HomePage_slide'>
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    <Carousel
                        centerMode
                        centerSlidePercentage={100}
                        showThumbs={false}
                        showStatus={false}
                        showArrows={false}
                        swipeable={true}
                        emulateTouch={true}
                        infiniteLoop={true}
                    >
                        <div className="carousel-slide">
                            <img src={data[0].slayder_img} alt="Slide 1" />
                            <div className="carousel-text">
                                <div className="info">
                                    <p className='sale'>{handleGetData(lang, [data[0].slayder_price_name_en, data[0].slayder_price_name_ru, data[0].slayder_price_name_hy])}</p>
                                    <p className='hot-price-suggestion'>{handleGetData(lang, [data[0].slayder_name_en, data[0].slayder_name_ru, data[0].slayder_name_hy])}</p>
                                    <p className='hot-price-text'>{handleGetData(lang, ['Starting at', 'Горячая цена', 'Թեժ գին'])}</p>
                                    <p className='hot-price'>{data[0].slayder_price}դր․</p>
                                    <button>{handleGetData(lang, [data[0].button_name_en, data[0].button_name_ru, data[0].button_name_hy])}</button>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-slide">
                            <img src={data[1].product_img1} alt="Slide 1" />
                            <div className="carousel-text">
                                <div className="info">
                                    <p className='sale'>{handleGetData(lang, [data[1].product_price_name1_en, data[1].product_price_name1_ru, data[1].product_price_name1_hy])}</p>
                                    <p className='hot-price-suggestion'>{handleGetData(lang, [data[1].product_name1_en, data[1].product_name1_ru, data[1].product_name1_hy])}</p>

                                    <p className='hot-price-text'>{handleGetData(lang, ['Starting at', 'Горячая цена', 'Թեժ գին'])}</p>

                                    <p className='hot-price'>{data[1].product_price1}դր․</p>
                                    <button>{handleGetData(lang, [data[0].button_name_en, data[0].button_name_ru, data[0].button_name_hy])}</button>
                                </div>
                            </div>
                        </div>


                        <div className="carousel-slide">
                            <img src={data[1].product_img2} alt="Slide 1" />
                            <div className="carousel-text">
                                <div className="info">
                                    <p className='sale'>{handleGetData(lang, [data[1].product_price_name2_en, data[1].product_price_name2_ru, data[1].product_price_name2_hy])}</p>

                                    <p className='hot-price-suggestion'>{handleGetData(lang, [data[1].product_name2_en, data[1].product_name2_ru, data[1].product_name2_hy])}</p>

                                    <p className='hot-price-text'>{handleGetData(lang, ['Starting at', 'Горячая цена', 'Թեժ գին'])}</p>

                                    <p className='hot-price'>{data[1].product_price2}դր․</p>

                                    <button>{handleGetData(lang, [data[0].button_name_en, data[0].button_name_ru, data[0].button_name_hy])}</button>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>

            <div className="right_hand">
                <div className="item" style={{
                    color: '#fff'
                }}>
                    <div className="info">
                        <p>{handleGetData(lang, [data[0].product_name1_en, data[0].product_name1_ru, data[0].product_name1_hy])}</p>
                        <p>{handleGetData(lang, [data[0].product_price_name1_en, data[0].product_price_name1_ru, data[0].product_price_name1_hy])}</p>
                        <p>{data[0].product_price1}դր․</p>
                    </div>
                    <img src={data[0].product_img1} alt="tool" />
                </div>
                <div className="item" style={{
                    backgroundColor: 'rgb(228, 241, 251)',
                    color: '#000'
                }}>
                    <div className="info">
                        <p>{handleGetData(lang, [data[0].product_name2_en, data[0].product_name2_ru, data[0].product_name2_hy])}</p>
                        <p>{handleGetData(lang, [data[0].product_price_name2_en, data[0].product_price_name2_ru, data[0].product_price_name2_hy])}</p>
                        <p>{data[0].product_price2}դր․</p>
                    </div>
                    <img src={data[0].product_img2} alt="tool" />
                </div>
            </div>
        </div>
    );
};

export default Slide;
