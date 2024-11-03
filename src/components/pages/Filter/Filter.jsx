import React, { useEffect, useState } from 'react';
import './Filter.css'; // Optional for styling

const Filter = ({ setMix, products }) => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    const [filters, setFilters] = useState({
        availability: {},
        brand: {},
        category: {},
    });

    const [isFilterOpen, setFilterOpen] = useState({
        availability: true,
        brand: true,
        category: true,
    });

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await fetch('https://shinflex.am/SFApi/Brand/');
                const data = await response.json();
                setBrands(data);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };
        fetchBrands();
    }, []);

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

    const handleCheckboxChange = (type, key) => {
        setFilters((prevFilters) => {
            const newFilterState = {
                ...prevFilters[type],
                [key]: !prevFilters[type][key],
            };

            const updatedFilters = {
                ...prevFilters,
                [type]: newFilterState,
            };

            setMix(updatedFilters);
            return updatedFilters;
        });
    };

    const getCount = (filterType, value) => {
        switch (filterType) {
            case 'availability':
                return value === 'In stock'
                    ? products.filter((p) => !p.sale && p.count > 0).length
                    : products.filter((p) => !p.sale && p.count === 0).length;

            case 'brand':
                return products.filter((p) => !p.sale && p.brand[0] === value).length;

            case 'category':
                return products.filter((p) => !p.sale && p.category[0] === value).length;

            default:
                return 0;
        }
    };

    return (
        <div className="filter-container">
            <p style={{ fontWeight: '500', fontSize: '17px', marginBottom: '15px' }}>Filter</p>

            {['availability', 'brand', 'category'].map((filterType) => (
                <div key={filterType} className="filter-section">
                    <div
                        className="filter-header"
                        onClick={() =>
                            setFilterOpen((prev) => ({
                                ...prev,
                                [filterType]: !prev[filterType],
                            }))
                        }
                    >
                        <p>{filterType.charAt(0).toUpperCase() + filterType.slice(1)}</p>
                    </div>

                    {isFilterOpen[filterType] &&
                        (filterType === 'availability'
                            ? ['In stock', 'Out of stock'].map((item) => (
                                <div className="filter-checkbox" key={item}>
                                    <input
                                        id={`filter-check${item}`}
                                        style={{ accentColor: '#DF3030' }}
                                        type="checkbox"
                                        checked={!!filters.availability[item]}
                                        onChange={() => handleCheckboxChange('availability', item)}
                                    />
                                    <label htmlFor={`filter-check${item}`}>
                                        {item} ({getCount('availability', item)})
                                    </label>
                                </div>
                            ))
                            : filterType === 'brand'
                                ? brands.map((brand) => (
                                    <div className="filter-checkbox" key={brand.id}>
                                        <input
                                            id={`filter-check${brand.id}`}
                                            style={{ accentColor: '#DF3030' }}
                                            type="checkbox"
                                            checked={!!filters.brand[brand.id]}
                                            onChange={() => handleCheckboxChange('brand', brand.id)}
                                        />
                                        <label htmlFor={`filter-check${brand.id}`}>
                                            {brand.name_en} ({getCount('brand', brand.id)})
                                        </label>
                                    </div>
                                ))
                                : filterType === 'category' ?
                                    categories.map((category) => (
                                        <div className="filter-checkbox" key={category.id}>
                                            <input
                                                id={`filter-Check${category.id}`}
                                                type="checkbox"
                                                style={{ accentColor: '#DF3030' }}
                                                checked={!!filters.category[category.id]}
                                                onChange={() => handleCheckboxChange('category', category.id)}
                                            />
                                            <label htmlFor={`filter-Check${category.id}`}>
                                                {category.category_name_en} ({getCount('category', category.id)})
                                            </label>
                                        </div>
                                    )) : '')}
                </div>
            ))}
        </div>
    );
};

export default Filter; 