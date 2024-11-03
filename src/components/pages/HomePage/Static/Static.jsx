import React, { useEffect, useState } from 'react'
import './Static.css'
import { useNavigate } from 'react-router-dom';
import Loading from '../../../loading/Loading';

const Static = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Product/");
                const result = await response.json();
                setData(result.slice(result.length - 3));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    const handleProductClick = (product) => {
        navigate('/product-details', { state: product });
    };

    if (loading) return <Loading />;

    const setup = [
        {
            product: data[0],
            statusColor: '',
            statusFontColor: '',
            bgc: '#ffba06',
            color: '#000',
            status: '',
            title: `${handleGetData(lang, [data[0].name_en, data[0].name_ru, data[0].name_hy])}`,
            desc: `${handleGetData(lang, ['Starting From', 'Начиная', 'Սկսած'])}`,
            price: parseInt(data[0].price) + 'դր․',
            src: data[0].img1,
            alt: 'tool'
        },
        {
            product: data[1],
            statusColor: '#f35c04',
            statusFontColor: '#fff',
            bgc: '#e4f2fb',
            color: '#000',
            status: `${handleGetData(lang, ['New', 'Новый', 'Նոր'])}`,
            title: `${handleGetData(lang, [data[1].name_en, data[1].name_ru, data[1].name_hy])}`,
            desc: `${handleGetData(lang, ['Lowest Price', 'Самая низкая цена', 'Նվազագույն Գինը'])}`,
            price: parseInt(data[1].price) + 'դր․',
            src: data[1].img1,
            alt: 'tool'
        },
        {
            product: data[2],
            statusColor: '#fff',
            statusFontColor: '#000',
            bgc: '#f35c04',
            color: '#fff',
            status: `${handleGetData(lang, ['New', 'Новый', 'Նոր'])}`,
            title: `${handleGetData(lang, [data[2].name_en, data[2].name_ru, data[2].name_hy])}`,
            desc: `${handleGetData(lang, ['Lowest Price', 'Самая низкая цена', 'Նվազագույն Գինը'])}`,
            price: parseInt(data[2].price) + 'դր․',
            src: data[2].img1,
            alt: 'tool'
        },
    ]

    return (
        <div className='HomePage_static__main'>
            {setup.map((item, index) => (
                <div className='item' key={index} style={{ backgroundColor: `${item.bgc}`, color: `${item.color}` }} onClick={() => handleProductClick(item.product)}>
                    <div className="left_hand">
                        <span className={`status ${item.status}`} style={{ backgroundColor: `${item.statusColor}`, color: `${item.statusFontColor}` }}>{item.status}</span>
                        <p>{item.title}</p>
                        <p>{item.desc}</p>
                        <p>{item.price}</p>
                    </div>
                    <div className="right_hand">
                        <img src={item.src} alt={item.alt} style={{ mixBlendMode: 'multiply' }} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Static