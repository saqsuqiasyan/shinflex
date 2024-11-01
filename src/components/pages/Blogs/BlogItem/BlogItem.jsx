import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BlogItem.css';

const BlogItem = () => {
    const { id } = useParams();
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
        return <div>Loading...</div>;
    }

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    const post = data.find((post) => post.id === parseInt(id));

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="blog-detail">
            <img src={post.img} alt={post.title} className="blog-detail-image" />
            <h1>{handleGetData(lang, [post.name_en, post.name_ru, post.name_hy])}</h1>
            <p>{handleGetData(lang, [post.date_en, post.date_ru, post.date_hy])}</p>
            <p>{handleGetData(lang, [post.text_en, post.text_ru, post.text_hy])}</p>
        </div>
    );
};

export default BlogItem;