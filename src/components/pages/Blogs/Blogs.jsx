import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Blogs.css';
import Loading from '../../loading/Loading'

const Blogs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://shinflex.am/SFApi/News/');
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

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    return (
        <div className="blog-list">
            {data.map(post => (
                <div key={post.id} className="blog-card" onClick={() => navigate(`/news/post/${post.id}`)}>
                    <div className="blog-image">
                        <img src={post.img} alt={handleGetData(lang, [post.name_en, post.name_ru, post.name_hy])}  />
                    </div>
                    <div className="blog-details">
                        <p>{handleGetData(lang, [post.date_en, post.date_ru, post.date_hy])}</p>
                        <h2>{handleGetData(lang, [post.name_en, post.name_ru, post.name_hy])}</h2>
                        <span className="read-more">{handleGetData(lang, [post.but_name_en, post.but_name_ru, post.but_name_hy])}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Blogs;