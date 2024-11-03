import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MenuSM.css';
import AOS from 'aos';

const MenuSM = ({ sm }) => {
    const location = useLocation();
    const [categories, setCategories] = useState([]);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
        });

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://shinflex.am/SFApi/Category/');
                const result = await response.json();
                setCategories(result);
                setLoading(false);                
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    if (loading) return;

    const scrollToSaleCollection = (id) => {
        const saleCollectionElement = document.getElementById(id);
        if (saleCollectionElement) {
            saleCollectionElement.scrollIntoView({ behavior: 'smooth' });
        }
        sm(false);
    };

    return (
        <div className="menuSM_full">
            <div className='menuSM_main' data-aos="fade-right">
                <div className="menu-header">
                    <h3>Menu</h3>
                    <button className="close-btn" onClick={() => sm(false)}>✕</button>
                </div>
                <ul>
                    <li><Link onClick={() => sm(false)} to="/">
                        {handleGetData(lang, ['Home', 'Главный', 'Գլխավոր'])}
                    </Link></li>
                    {location.pathname === '/' && <li>
                        <Link onClick={() => scrollToSaleCollection('all-products')}>
                        {handleGetData(lang, ['Our Store', 'Наш магазин', 'Մեր Խանութ'])}
                        </Link>
                    </li>}
                    <li>
                        <Link to="/collections/sale-collection/_" onClick={() => sm(false)}>
                        {handleGetData(lang, ['Special', 'Специальный', 'Հատուկ'])}
                        <span className="label sale">SALE</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/collections/sale-collection/_" onClick={() => sm(false)}>
                    {handleGetData(lang, ['Categories', 'Категории', 'Կատեգորիաներ'])}
                            
                             <span className="label hot">HOT</span>
                        </Link>
                    </li>
                    {location.pathname === '/' && <li><Link onClick={() => scrollToSaleCollection('sale-collection')}>
                    {handleGetData(lang, ['Top Offers', 'Лучшие предложения', 'Լավագույն առաջարկներ'])}
                    </Link></li>}

                    {categories.map((item, id) => (
                        <li key={id}>
                            <Link onClick={() => sm(false)} to={`/collections/${item.category_name_en.toLowerCase().replaceAll(' ', '-')}/${item.id}`}>
                                {handleGetData(lang, [item.category_name_en, item.category_name_ru, item.category_name_hy])}
                            </Link>
                        </li>
                    ))}
                    
                    <div className="menu-footer">
                        <div className="social-icons">
                            <a href="/"><i className="fab fa-twitter"></i></a>
                            <a href="/"><i className="fab fa-facebook"></i></a>
                            <a href="/"><i className="fab fa-pinterest"></i></a>
                            <a href="/"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </ul>
            </div>

            <div className='close' onClick={() => sm(false)}></div>
        </div>
    );
};

export default MenuSM;
