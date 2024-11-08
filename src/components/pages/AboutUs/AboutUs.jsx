import React, { useEffect, useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const [lang] = useState(localStorage.getItem('lang') || 'hy');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://shinflex.am/SFApi/AboutUs/");
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
    return;
  }

  return (
    <div className="about-container">
      <section className="about-section">
        <h2 className="about-heading">{handleGetData(lang, [data[0].title1_en, data[0].title1_ru, data[0].title1_hy])}</h2>
        <p className="about-text">
          {handleGetData(lang, [data[0].text1_en, data[0].text1_ru, data[0].text1_hy])}
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-heading">{handleGetData(lang, [data[0].title2_en, data[0].title2_ru, data[0].title2_hy])}</h2>
        <p className="about-text">
          {handleGetData(lang, [data[0].text2_en, data[0].text2_ru, data[0].text2_hy])}
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-heading">{handleGetData(lang, [data[0].title3_en, data[0].title3_ru, data[0].title3_hy])}</h2>
        <p className="about-text">
          {handleGetData(lang, [data[0].text3_en, data[0].text3_ru, data[0].text3_hy])}
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-heading">{handleGetData(lang, [data[0].title4_en, data[0].title4_ru, data[0].title4_hy])}</h2>
        <p className="about-text">
          {handleGetData(lang, [data[0].text4_en, data[0].text4_ru, data[0].text4_hy])}
        </p>
      </section>
    </div>
  );
};

export default AboutUs;