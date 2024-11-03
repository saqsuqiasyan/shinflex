import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Example from '../../../../assets/photos/driller.png';
import './ourStore.css';

const OurStore = () => {
    const [hideTools, setHideTools] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [subData, setSubData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/OurStore/");
                const result = await response.json();
                setData(result);
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
                const response = await fetch("https://shinflex.am/SFApi/OurStoreSub/");
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
                <Link style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'normal' }}>{handleGetData(lang, [el.subcategory_en, el.subcategory_ru, el.subcategory_hy])}</Link>
            </p>
        ));
    };

    return (
        <div className='ourStoreMain' style={hideTools ? { display: 'none' } : {}} data-aos="fade-up">
            <div className="side_left" onClick={() => setHideTools(true)}>
                <div className="left_side_child">
                    {data[0] && (
                        <>
                            <p style={{ textDecoration: 'none', fontSize: '18px' }}>
                                {handleGetData(lang, [data[0].category_name_en, data[0].category_name_ru, data[0].category_name_hy])}
                            </p>
                            {sidesMapping(subData, 1)}
                        </>
                    )}
                </div>
                <div className="left_side_child">
                    {data[1] && (
                        <>
                            <p style={{ textDecoration: 'none', fontSize: '18px' }}>
                                {handleGetData(lang, [data[1].category_name_en, data[1].category_name_ru, data[1].category_name_hy])}
                            </p>
                            {sidesMapping(subData, 2)}
                        </>
                    )}
                </div>
            </div>
            <div className="side_right">
                <div className='sale_driller_left'>
                    <div className="sale_text_info">
                        <p style={{ backgroundColor: '#fff', padding: '5px', textTransform: 'uppercase', display: 'inline', fontWeight: 'normal', borderRadius: '4px', lineHeight: '16px' }}>offer</p>
                        <p style={{ fontSize: '23px', lineHeight: '1.2' }}>Flat 80% OFF</p>
                    </div>
                    <div className="sale_driller_photo">
                        <img src={Example} alt="driller" />
                    </div>
                </div>
                <div className='sale_driller_right'>
                    <div className="sale_text_info" style={{ marginLeft: '20px' }}>
                        <p style={{ backgroundColor: '#fff', padding: '5px', textTransform: 'uppercase', display: 'inline', fontWeight: 'normal', borderRadius: '4px', lineHeight: '16px' }}>special offer</p>
                        <p style={{ fontSize: '23px', lineHeight: '1.2' }}>Up to 30% OFF</p>
                    </div>
                    <div className="sale_driller_photo" style={{ width: '30%', height: '90%' }}>
                        <img src={Example} alt="driller" style={{ width: '100%', height: '90%' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurStore;