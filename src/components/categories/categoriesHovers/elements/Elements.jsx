import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Elements.css'

const Element = () => {
  const [hideTools, setHideTools] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lang] = useState(localStorage.getItem('lang') || 'hy');

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://shinflex.am/SFApi/Elements/");
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
    return null;
  }

  const urls = [
    {
      title: handleGetData(lang, [data[0].page_name1_en, data[0].page_name1_ru, data[0].page_name1_hy]),
      url: '/pages/about-us'
    },
    {
      title: handleGetData(lang, [data[0].page_name2_en, data[0].page_name2_ru, data[0].page_name2_hy]),
      url: '/blogs/news'
    },
    {
      title: handleGetData(lang, [data[0].page_name4_en, data[0].page_name4_ru, data[0].page_name4_hy]),
      url: '/pages/faq'
    }
  ]

  return (
    <div className='ElementsMain' style={hideTools ? { display: 'none' } : {}} data-aos="fade-up">
      {urls.map((obj, id) => (
        <p key={id} onClick={() => setHideTools(true)}><Link style={{ color: 'inherit', textDecoration: 'none' }} to={obj.url}>{obj.title}</Link></p>
      ))}
    </div>
  )
}

export default Element