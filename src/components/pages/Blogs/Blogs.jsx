import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Blogs.css';
import Loading from '../../loading/Loading'

const Blogs = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');

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
                <div key={post.id} className="blog-card">
                    <img src={post.img} alt={handleGetData(lang, [post.name_en, post.name_ru, post.name_hy])} className="blog-image" />
                    <div className="blog-details">
                        <p>{handleGetData(lang, [post.date_en, post.date_ru, post.date_hy])}</p>
                        <h2><Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/news/post/${post.id}`}>{handleGetData(lang, [post.name_en, post.name_ru, post.name_hy])}</Link></h2>
                        <Link to={`/news/post/${post.id}`} className="read-more">{handleGetData(lang, [post.but_name_en, post.but_name_ru, post.but_name_hy])}</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Blogs;