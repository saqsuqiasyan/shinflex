import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoStar } from 'react-icons/io5'
import './Categories.css'

const Categories = () => {
    const [products, setProducts] = useState([]);
    const [hideTools, setHideTools] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [subData, setSubData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Product/");
                const result = await response.json();
                setProducts(result.filter(b => b.bselling).slice(0, 4));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Category/");
                const result = await response.json();
                setData(result.slice(0, 6));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchSubData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/CategorySub/");
                const result = await response.json();
                setSubData(result);
            } catch (error) {
                console.error("Error fetching sub-data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSubData();
    }, []);

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    if (loading) return;

    const sidesMapping = (subStore, category) => {
        const filtered = subStore.filter(item => item.category === category);
        return filtered.map((el, id) => (
            <p key={id}>
                {/* to={'/collections/' + el.subcategory_en.toLowerCase().replaceAll(' ', '-')} */}
                <Link style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'normal' }}>
                {handleGetData(lang, [el.subcategory_en, el.subcategory_ru, el.subcategory_hy])}</Link>
            </p>
        ));
    };

    const handleProductClick = (product) => {
        navigate(`/product-details/${product.id}`);
        setHideTools(true)
    };

    return (
        <div className='categories_nav_main' style={hideTools ? { display: 'none' } : {}} data-aos="fade-up">
            <div className="left_hand">
                {data.map((item, id) => (
                    <div className='child' onClick={() => setHideTools(true)} key={id}>
                        <p style={{ textDecoration: 'none', fontSize: '18px' }}>{handleGetData(lang, [item.category_name_en, item.category_name_ru, item.category_name_hy])}</p>
                        {sidesMapping(subData, item.id)}
                    </div>
                ))}
            </div>

            <div className="right_hand">
                <p className="best_selling">{handleGetData(lang, ['Best Selling', 'Самый продаваемый', 'Լավագույն վաճառք'])}</p>

                <div className="items">
                    {products.map((item, id) => (
                        <div className="item" key={id} onClick={() => handleProductClick(item)}>
                            <div className="image">
                                <img src={item.img1} alt="Tool" style={{transform: 'scale(0.6)'}} />
                            </div>
                            <div className="stats">
                                <p className="name" onClick={() => setHideTools(true)}>
                                    {handleGetData(lang, [item.name_en, item.name_ru, item.name_hy])}
                                </p>
                                <p className="price">{parseInt(item.price)}դր․</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Categories