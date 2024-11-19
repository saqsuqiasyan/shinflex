import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';

const Products = ({ mix = { availability: {}, brand: {}, category: {} }, categoryParam }) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isEntered, setIsEntered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;
    const navigate = useNavigate();

    const totalPages = Math.ceil(filteredData.length / productsPerPage);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Product/");
                const result = await response.json();
                const filtered = result.filter(item => categoryParam ? item.category == parseInt(categoryParam) : item)
                setData(filtered);
                setFilteredData(filtered);
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [categoryParam]);

    useEffect(() => {
        const applyFilters = () => {
            let filtered = data;

            if (mix.availability?.['In stock']) {
                filtered = filtered.filter(product => product.count > 0 && !product.sale);
            }
            if (mix.availability?.['Out of stock']) {
                filtered = filtered.filter(product => product.count === 0 && !product.sale);
            }

            const selectedBrands = Object.keys(mix.brand || {}).filter(brandId => mix.brand[brandId]);
            if (selectedBrands.length > 0) {
                filtered = filtered.filter(product => 
                    product.brand?.[0]?.toString() && selectedBrands.includes(product.brand[0].toString())
                );
            }

            const selectedCategories = Object.keys(mix.category || {}).filter(categoryId => mix.category[categoryId]);
            if (selectedCategories.length > 0) {
                filtered = filtered.filter(product => 
                    product.category?.[0]?.toString() && selectedCategories.includes(product.category[0].toString())
                );
            }
        
            setFilteredData(filtered);
        };        

        applyFilters();
    }, [mix, data]);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    const handleProductClick = (product) => {
        navigate(`/product-details/${product.id}`);
    };

    if (loading) return;

    return (
        <div className="products-container" id='all-products'>
            <div className="slider-container">
                {filteredData
                    .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
                    .map((product, id) => (
                        !product.sale && (
                            <div
                                className="product-card"
                                onClick={() => handleProductClick(product)}
                                onMouseEnter={() => setIsEntered(id)}
                                onMouseLeave={() => setIsEntered(null)}
                                key={id}
                            >
                                <div className="img_cont">
                                    <img
                                        src={isEntered === id ? product.img2 : product.img1}
                                        alt={handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])}
                                        className="product-image"
                                    />
                                </div>
                                <h3>{handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])}</h3>
                                <div className="product-price">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '20px', color: '#df3030', fontWeight: 'bold' }}>
                                            {parseInt(product.price)}դր․
                                        </span>
                                        <span
                                            style={{ marginRight: '15px', color: product.count > 0 ? '#006FCF' : '#DF3030' }}
                                        >
                                            {product.count > 0
                                                ? handleGetData(lang, ['Available', 'Доступнo', 'Առկա է'])
                                                : handleGetData(lang, ['Unavailable', 'Недоступнo', 'Առկա չէ'])}
                                        </span>
                                    </div>
                                </div>
                                <button className="add-to-cart" style={{ marginTop: '30px' }}>
                                    {handleGetData(lang, ['Add to cart', 'Добавить', 'Ավելացնել'])}
                                </button>
                            </div>
                        )
                    ))}
            </div>

            <div className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Products;
