import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const [data, setData] = useState([]);
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
                        {handleGetData(lang, ['Here you can find all kinds of products necessary for home and construction.', 'Здесь вы можете найти все виды товаров, необходимых для дома и строительства.', 'Այստեղ կարող եք գտնել տան և շինարարության համար անհրաժեշտ բոլոր տեսակի ապրանքները:'])}
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
                    <a href={`tel:${data[0].call}`} style={{ color: '#DF3030', textDecoration: 'none', margin: '8px 0' }}>📞 {data[0].call}</a> <p></p>
                    <a href={`tel:${data[0].call2}`} style={{ color: '#DF3030', textDecoration: 'none', margin: '8px 0' }}>📞 {data[0].call2}</a>
                    <p>{handleGetData(lang, [data[0].date1_en, data[0].date1_ru, data[0].date1_hy])}</p>
                    <p>{handleGetData(lang, [data[0].date2_en, data[0].date2_ru, data[0].date2_hy])}</p>
                    <p>{data[0].addres}</p>
                    <a href={`mailto:${data[0].email}`} style={{ textDecoration: 'none', color: '#DF3030' }}>✉️ {data[0].email}</a>
                </div>

                <div className="footer-links">
                    <div>
                        <h3>{handleGetData(lang, [data[0].qulink_en, data[0].qulink_ru, data[0].qulink_hy])}</h3>
                        <ul>
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
                </div>
            </div>

            <div className="footer-bottom">
                <p>Powered by <a href="https://globalitacademy.am/" target='_blank' style={{ color: '#DF3030' }}>Global IT Academy</a> &copy; 2024</p>
                <div className="payment-icons">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-paypal"></i>
                    <i className="fab fa-cc-discover"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
