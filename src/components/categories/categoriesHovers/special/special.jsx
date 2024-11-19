import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './special.css';

const Special = () => {
    const [data, setData] = useState([]);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [hideTools, setHideTools] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Product/");
                const result = await response.json();
                const filtered = result.filter(item => item.bselling);
                setData(filtered);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    const handleProductClick = (product) => {
        navigate(`/product-details/${product.id}`);
        setHideTools(true);
    };

    return (
        <div className="special_main" style={hideTools ? { display: 'none' } : {}} data-aos="fade-up">
            <div className='special_category_main'>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
                    navigation
                    loop={true}
                    className="special_category_card"
                >
                    {data.map((product, key) => (
                        <SwiperSlide key={key}>
                            <li className="special_category_card_item" onClick={() => handleProductClick(product)}>
                                <div className="card_item_img_container">
                                    <img src={product.img1} alt={handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])} />
                                </div>
                                <p className='card_item_name' onClick={() => setHideTools(true)}>
                                    {handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])}
                                </p>
                                <p className="price">{product.price} դր․</p>
                                <button className="add_to_cart_btn">
                                    {handleGetData(lang, ['Add to cart', 'Добавить', 'Ավելացնել'])}
                                </button>
                            </li>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Special;
