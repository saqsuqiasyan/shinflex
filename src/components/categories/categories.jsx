import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './categories.css';
import { PiSealPercentLight } from "react-icons/pi";
import 'aos/dist/aos.css';
import BrowseCategoriesX from './X/BrowseCategoriesX.jsx'
import OurStoreX from './X/OurStoreX.jsx';
import SpecialX from './X/SpecialX.jsx';
import CategoriesX from './X/CategoriesX.jsx';
import ElementsX from './X/ElementsX.jsx';
import { FiSearch } from 'react-icons/fi';
import Loading from '../loading/Loading.jsx'

const Categories = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lang] = useState(localStorage.getItem('lang') || 'hy');
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const scrollToSaleCollection = () => {
    const saleCollectionElement = document.getElementById('sale-collection');
    if (saleCollectionElement) {
      saleCollectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy
  }

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://shinflex.am/SFApi/Product/");
        const result = await response.json();

        const filtered = result.filter(item => {
          const name = handleGetData(lang, [
            item.name_en || "",
            item.name_ru || "",
            item.name_hy || ""
          ]);

          return name.toLowerCase().includes(search.toLowerCase());
        }).slice(0, 5);

        setProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (search) {
      fetchData();
    } else {
      setProducts([]);
    }
  }, [search, lang]);

  if (loading) {
    return <Loading />;
  }

  if (!data || !data[0]) {
    return <div>No data available</div>;
  }

  const handleProductClick = (product) => {
    setProducts([]);
    setSearch('')
    navigate('/product-details', { state: product });
  };

  return (
    <div className='categories_main__wrapper'>
      <BrowseCategoriesX label={handleGetData(lang, [data[0].browse_name_en, data[0].browse_name_ru, data[0].browse_name_hy])} />

      <div className="more_categories">
        <div className='categories__container'>
          <Link to='/' style={{ color: '#000', textDecoration: 'none' }}>{handleGetData(lang, [data[0].home_name_en, data[0].home_name_ru, data[0].home_name_hy])}</Link>
          <OurStoreX />
          <SpecialX label={handleGetData(lang, [data[0].special_name_en, data[0].special_name_ru, data[0].special_name_hy])} />
          <CategoriesX />
          {/* <TopDealsX /> */}
          <ElementsX />
        </div>
      </div>

      <div className='searchItem'>
        <input type="text" placeholder={`${handleGetData(lang, ['Search...', 'Поиск...', 'Որոնել...'])}`} onChange={(e) => setSearch(e.target.value)} value={search} />
        <FiSearch className='searchIcon' />
        <div className="searchResults" style={{
          display: search && products.length > 0 ? 'block' : 'none',
          fontFamily: '"Inter", sans-serif',
          position: 'absolute',
          top: '40px',
          left: '0',
          width: '100%',
          zIndex: '9999',
          backgroundColor: '#fff',
          borderRadius: '5px',
          padding: '10px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          {products.map((product, id) => (
            <div className='searchResult' key={id} onClick={() => handleProductClick(product)} style={{
              cursor: 'pointer',
              padding: '10px',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <p>{handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])}</p>
                <b>{product.price}դր․</b>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="top_offers">
        <PiSealPercentLight className='toolsIcon' />
        <p className='topOffer' onClick={scrollToSaleCollection}>{handleGetData(lang, [data[0].top_offers_en, data[0].top_offers_ru, data[0].top_offers_hy])}</p>
      </div>
    </div>
  );
};

export default Categories;
