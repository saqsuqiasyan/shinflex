import React, { useEffect, useState } from 'react'
import Loading from '../loading/Loading'
import { FiSearch, FiPhoneCall } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import { GiExitDoor } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import MenuSM from './MenuSM/MenuSM';
import Cart from '../pages/Cart/Cart';

const HeaderMain = () => {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [lang] = useState(localStorage.getItem('lang') || 'hy');
  const [sm, setSM] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [cartCount, setCartCount] = useState(parseInt(localStorage.getItem('cartCount') || '0'));
  const [totalPrice, setTotalPrice] = useState(parseInt(localStorage.getItem('totalPrice') || '0'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const count = parseInt(localStorage.getItem('cartCount') || '0');
      const price = parseFloat(localStorage.getItem('totalPrice') || '0');
      setCartCount(count);
      setTotalPrice(price);
    };

    window.addEventListener('cartUpdated', updateCartCount);

    updateCartCount();

    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy;
  };

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

  useEffect(() => {
    const syncLocalStorage = (event) => {
      if (event.key === 'cartCount' || event.key === 'totalPrice') {
        setCartCount(parseInt(localStorage.getItem('cartCount') || '0'));
        const delayUpdate = setTimeout(() => {
          setTotalPrice(parseFloat(localStorage.getItem('totalPrice') || '0'));
        }, 1000);
  
        return () => clearTimeout(delayUpdate);
      }
    };

    window.addEventListener('storage', syncLocalStorage);

    return () => {
      window.removeEventListener('storage', syncLocalStorage);
    };
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

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data || !data[0]) {
    return <div>No data available</div>;
  }

  const handleProductClick = (product) => {
    setProducts([]);
    setSearch('')
    navigate(`/product-details/${product}`);
  };

  return (
    <div className='headerMain'>
      <div style={{ position: 'absolute', zIndex: '-9999', opacity: '0' }}>
        {token && <Cart show={() => setShowCart(false)} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <IoMenuSharp className="header_menu_icon" onClick={() => setSM(true)} />
        {sm && <MenuSM sm={() => setSM()} />}
        <div id='logo'>
          <Link to='/'>
            <img src={data[0].logo} alt="ShinFlex" />
          </Link>
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
            <div className='searchResult' key={id} onClick={() => handleProductClick(product.id)} style={{
              cursor: 'pointer',
              padding: '10px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
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
      <ul className='statsAndInfo'>
        <li id='phone'>
          <div className='header_data__panel'>
            <FiPhoneCall className='statsIcon' />
            <div>
              <p>{handleGetData(lang, [data[0].call_text_en, data[0].call_text_ru, data[0].call_text_hy])}</p>
              <span><a style={{ color: 'inherit', textDecoration: 'none' }} href={`tel:${data[0].call_number}`}>{data[0].call_number}</a></span>
            </div>
          </div>
        </li>
        <li>
          <div className='header_data__panel'>
            {name ? <GiExitDoor className='statsIcon' onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('name');
              window.location.reload();
            }} /> : <Link to="/account/login">
              <FaRegUser className='statsIcon' />
            </Link>}
            <div className='remo'>
              <p>{handleGetData(lang, [data[0].login_en, data[0].login_ru, data[0].login_hy])}</p>
              <span>{name ? name : <Link to="/account/login" style={{ color: 'inherit', textDecoration: 'none' }}>{handleGetData(lang, ['Log in', 'Авторизоваться', 'Մուտք'])}</Link>}</span>
            </div>
          </div>
        </li>
        <li>
          <div className='header_data__panel' style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <FaCartShopping className='statsIcon' onClick={() => setShowCart(true)} />
              {showCart && <Cart show={() => setShowCart(false)} />}
              {token && cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  lineHeight: '1',
                }}>
                  {cartCount}
                </span>
              )}
            </div>
            <div className='remo'>
              <p>{handleGetData(lang, [data[0].user_text_en, data[0].user_text_ru, data[0].user_text_hy])}</p>
              <span>{token ? totalPrice.toFixed(2) : '0.00'}դր․</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HeaderMain;