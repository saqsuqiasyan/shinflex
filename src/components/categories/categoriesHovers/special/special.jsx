import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './special.css'

const Special = () => {
    const [data, setData] = useState([]);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [hideTools, setHideTools] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 5;
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

    const handleNext = () => {
        if (currentIndex < data.length - itemsToShow) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    const handleProductClick = (product) => {
        navigate('/product-details', { state: product });
        setHideTools(true)
    };

    return (
        <div className="special_main" style={hideTools ? { display: 'none' } : {}} data-aos="fade-up">
            <div className='special_category_main'>
                <button className="prev_btn" onClick={handlePrev}>&lt;</button>
                <ul className="special_category_card" style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
                    {data.map((product, key) => (
                        <li key={key} className="special_category_card_item" onClick={() => handleProductClick(product)}>
                            <div className="card_item_img_container">
                                <img src={product.img1} alt={handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])} />
                            </div>
                            <p className='card_item_name' onClick={() => setHideTools(true)}>
                                {handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])}
                            </p>
                            <p className="price">{product.price} դր․</p>
                            <button className="add_to_cart_btn">                                    {handleGetData(lang, ['Add to cart', 'Добавить', 'Ավելացնել'])}</button>
                        </li>
                    ))}
                </ul>
                <button className="next_btn" onClick={handleNext}>&gt;</button>
            </div>
        </div>
    );
};

export default Special;
