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

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy
  }

  const scrollToMap = () => {
    const mapElement = document.getElementById('location-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='redContainer'>
      <ul className='topLeftHand'>
        <li>
          <Link to='/pages/about-us' style={{ color: 'inherit', textDecoration: 'none' }}>
            {handleGetData(lang, ['About us', 'О нас', 'Մեր մասին'])}
          </Link>
        </li>
        <li>
          <Link to='/blogs/news' style={{ color: 'inherit', textDecoration: 'none' }}>
            {handleGetData(lang, ['Blog', 'Блог', 'Բլոգ'])}
          </Link>
        </li>
        <li>
          <p onClick={scrollToMap} style={{ color: 'inherit', textDecoration: 'none' }}>
            {handleGetData(lang, ['Contact', 'Контакт', 'Կապ'])}
          </p>
        </li>
        <li>
          <Link to='/pages/faq' style={{ color: 'inherit', textDecoration: 'none' }}>
            {handleGetData(lang, ['FAQ', 'Часто задаваемые вопросы', 'ՀՏՀ'])}
          </Link>
        </li>
      </ul>
      <ul>
        <select className='currencyExchange' value={lang} onChange={handleChange}>
          <option value="hy" style={{ color: '#000' }}>Հայերեն</option>
          <option value="ru" style={{ color: '#000' }}>Русский</option>
          <option value="en" style={{ color: '#000' }}>English</option>
        </select>
      </ul>
    </div>
  );
};

export default HeaderTop;
