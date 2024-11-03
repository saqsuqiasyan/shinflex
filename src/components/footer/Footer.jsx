import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://shinflex.am/SFApi/Footer/');
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch('https://shinflex.am/SFApi/Category/');
                const result = await response.json();
                setCategories(result.slice(0, 5));
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

    return (
        !loading && data[0] && <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <img src={data[0].logo} alt="ShinFlex" />
                    <p>
                        {handleGetData(lang, ['Here you can find all kinds of products necessary for home and construction.', 'Здесь вы можете найти все виды товаров, необходимых для дома и строительства.', 'Այստեղ կարող եք գտնել տան եւ շինարարության համար անհրաժեշտ բոլոր տեսակի ապրանքները:'])}
                    </p>
                    <p>Shop On Map</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-pinterest"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                <div className="footer-help">
                    <h3>{handleGetData(lang, [data[0].need_en, data[0].need_ru, data[0].need_hy])}</h3>
                    <p>📞 {handleGetData(lang, [data[0].call_en, data[0].call_ru, data[0].call_hy])}</p>
                    <p>{handleGetData(lang, [data[0].date1_en, data[0].date1_ru, data[0].date1_hy])}</p>
                    <p>{handleGetData(lang, [data[0].date2_en, data[0].date2_ru, data[0].date2_hy])}</p>
                    <a href={`mailto:${data[0].email}`} style={{ textDecoration: 'none', color: '#DF3030' }}>✉️ {data[0].email}</a>
                </div>

                <div className="footer-links">
                    <div>
                        <h3>{handleGetData(lang, [data[0].inf_en, data[0].inf_ru, data[0].inf_hy])}</h3>
                        <ul>
                            <li>
                                <Link to='/pages/about-us' style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {handleGetData(lang, ['About us', 'О нас', 'Մեր մասին'])}
                                </Link>
                            </li>
                            <li>
                                <Link to='/pages/contact' style={{ color: 'inherit', textDecoration: 'none' }}>
                                    {handleGetData(lang, ['Contact', 'Контакт', 'Կապ'])}
                                </Link>
                            </li>
                            <li>
                                <Link to='/pages/compare' className='link'>
                                    {handleGetData(lang, ['Compare', 'Сравнивать', 'Համեմատեք'])}
                                </Link>
                            </li>
                            <li>
                                <Link to='/pages/faq' className='link'>FAQ</Link>
                            </li>
                            <li>
                                <Link to='/pages/wishlist' className='link'>
                                    {handleGetData(lang, ['Wishlist', 'Пожелания', 'Ցանկություններ'])}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>{handleGetData(lang, [data[0].qulink_en, data[0].qulink_ru, data[0].qulink_hy])}</h3>
                        <ul>
                            <li>
                                <Link to='/policies/contact-information' className='link'>
                                    {handleGetData(lang, ['Contact Information', 'Контактная информация', 'Կոնտակտային տվյալներ'])}
                                </Link>
                            </li>
                            <li>
                                <Link to='/policies/privacy-policy' className='link'>
                                    {handleGetData(lang, ['Privacy Policy', 'Kонфиденциальность', 'Գաղտնիություն'])}
                                </Link>
                            </li>
                            <li>
                                <Link to='/policies/refund-policy' className='link'>
                                    {handleGetData(lang, ['Refund Policy', 'Политика возврата', 'Փոխհատուցում'])}
                                </Link>
                            </li>
                            <li>
                                <Link to='/policies/shipping-policy' className='link'>
                                    {handleGetData(lang, ['Shipping Policy', 'Политика доставки', 'Առաքում'])}
                                </Link>
                            </li>
                            <li>
                                <Link to='/policies/terms-of-service' className='link'>
                                    {handleGetData(lang, ['Terms of Service', 'Условия обслуживания', 'Ծառայություն'])}
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>{handleGetData(lang, [data[0].exlink_en, data[0].exlink_ru, data[0].exlink_hy])}</h3>
                        <ul>
                            {categories.map((item, id) => (
                                <li key={id}>
                                    <Link to={`/collections/${item.category_name_en.toLowerCase().replaceAll(' ', '-')}/${item.id}`} className='link'>
                                        {handleGetData(lang, [item.category_name_en, item.category_name_ru, item.category_name_hy])}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Powered by <a href="https://globalitacademy.am/" target='_blank' style={{ color: '#DF3030' }}>Global IT Academy</a> &copy; 2024</p>
                <div className="payment-icons">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-amex"></i>
                    <i className="fab fa-cc-paypal"></i>
                    <i className="fab fa-cc-discover"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
