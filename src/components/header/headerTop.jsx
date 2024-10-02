import React, { useState, useEffect } from 'react';
import './headerStyles.css';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';

const HeaderTop = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'hy';
  });

  const handleChange = (event) => {
    const selectedLang = event.target.value;
    setLang(selectedLang);
    localStorage.setItem('lang', selectedLang);
    window.location.reload();
  };

  useEffect(() => {
    const storedLang = localStorage.getItem('lang');
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://shinflex.am/SFApi/Header/?format=json');
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

  if (loading) {
    return <Loading />;
  }

  if (!data || !data[0]) {
    return <div>No data available</div>;
  }

  // const handleGetData = (lang, [en, ru, hy]) => {
  //   return lang === 'en' ? en : lang === 'ru' ? ru : hy
  // }

  return (
    <div className='redContainer'>
      <ul className='topLeftHand'>
        <li>
          <Link to='/pages/about-us' style={{ color: 'inherit', textDecoration: 'none' }}>
            Մեր մասին
          </Link>
        </li>
        <li>
          <Link to='/blogs/news' style={{ color: 'inherit', textDecoration: 'none' }}>
            Բլոգ
          </Link>
        </li>
        <li>
          <Link to='/pages/contact' style={{ color: 'inherit', textDecoration: 'none' }}>
            Կապ
          </Link>
        </li>
        <li>
          <Link to='/pages/faq' style={{ color: 'inherit', textDecoration: 'none' }}>
            FAQ
          </Link>
        </li>
      </ul>

      <p className='saleAbout'>
        Խնայիր մինչև 20% զեղչ ողջ տեսականու համար օգտագործելով “SHINFLEX24”պրոմոկոդը
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ul className='currencyExchangeContainer'>
          <select className='currencyExchange'>
            <option value="AMD">ՀՀ Դրամ (AMD ֏)</option>
            <option value="RUB">РФ Рубль (RUB ₽)</option>
            <option value="USD">USA Dollar (USD $)</option>
          </select>
        </ul>

        <ul>
          <select className='currencyExchange' value={lang} onChange={handleChange}>
            <option value="hy">Հայերեն</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
