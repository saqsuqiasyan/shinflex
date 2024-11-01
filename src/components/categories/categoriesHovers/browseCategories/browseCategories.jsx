import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './browseCategories.css'

const BrowseCategories = () => {
    const [hideTools, setHideTools] = useState(false)
    const [categories, setCategories] = useState([]);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://shinflex.am/SFApi/Category/');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    return (
        <ul className='tool__browseCategories' style={hideTools ? { display: 'none' } : {}}>
            {categories.map((item, id) => (
                <Link key={id} to={`/collections/${item.category_name_en.toLowerCase().replaceAll(' ', '-')}/${item.id}`} className='tool_links' onClick={() => setHideTools(true)}>
                    <li className='browse_tool_item'>{handleGetData(lang, [item.category_name_en, item.category_name_ru, item.category_name_hy])}</li>
                </Link>
            ))}

        </ul>
    )
}

export default BrowseCategories;