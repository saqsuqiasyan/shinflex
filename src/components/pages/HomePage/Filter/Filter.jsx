import React, { useState } from 'react';
import { inStockArr, moreFiltersArr, brandArr, colorArr, productTypeArr } from './FilterStore';
import './Filter.css';

const Filter = ({ applyFilters }) => {
    const [availability, setAvailability] = useState({});
    const [moreFilters, setMoreFilters] = useState({});
    const [brand, setBrand] = useState({});
    const [color, setColor] = useState({});
    const [productType, setProductType] = useState({});

    const [isAvailabilityOpen, setAvailabilityOpen] = useState(true);
    const [isMoreFiltersOpen, setMoreFiltersOpen] = useState(true);
    const [isBrandOpen, setBrandOpen] = useState(true);
    const [isColorOpen, setColorOpen] = useState(true);
    const [isProductTypeOpen, setProductTypeOpen] = useState(true);

    const handleFilterChange = (category, value, setCategory) => {
        setCategory(prev => ({
            ...prev,
            [value]: !prev[value],
        }));
    };

    return (
        <div className="filter-container">
            <p style={{ fontWeight: '500', fontSize: '17px', marginBottom: '15px' }}>Filter</p>

            {/* Availability Section */}
            <div className="filter-section">
                <div className="filter-header" onClick={() => setAvailabilityOpen(!isAvailabilityOpen)}>
                    <p style={{ fontWeight: '500', fontSize: '15px' }}>Availability</p>
                </div>
                {isAvailabilityOpen && (
                    <div className="filter-options">
                        {inStockArr.map((el, id) => (
                            <label key={id} style={{ color: '#888888', fontWeight: '400', fontSize: '14px' }}>
                                <input
                                    type="checkbox"
                                    checked={availability[`${el.label}`] || false}
                                    onChange={() => handleFilterChange('availability', `${el.label}`, setAvailability)}
                                />
                                {`${el.label} (${el.count})`}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* More Filters Section */}
            <div className="filter-section">
                <div className="filter-header" onClick={() => setMoreFiltersOpen(!isMoreFiltersOpen)}>
                    <p style={{ fontWeight: '500', fontSize: '15px' }}>More filters</p>
                </div>
                {isMoreFiltersOpen && (
                    <div className="filter-options">
                        {moreFiltersArr.map((el, id) => (
                            <label style={{ color: '#888888', fontWeight: '400', fontSize: '14px' }} key={id}>
                                <input
                                    type="checkbox"
                                    checked={moreFilters[`${el.label}`] || false}
                                    onChange={() => handleFilterChange('moreFilters', `${el.label}`, setMoreFilters)}
                                />
                                {`${el.label} (${el.count})`}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Brand Section */}
            <div className="filter-section">
                <div className="filter-header" onClick={() => setBrandOpen(!isBrandOpen)}>
                    <p style={{ fontWeight: '500', fontSize: '15px' }}>Brand</p>
                </div>
                {isBrandOpen && (
                    <div className="filter-options">
                        {brandArr.map((el, id) => (
                            <label key={id} style={{ color: '#888888', fontWeight: '400', fontSize: '14px' }}>
                                <input
                                    type="checkbox"
                                    checked={brand[`${el.label}`] || false}
                                    onChange={() => handleFilterChange('brand', `${el.label}`, setBrand)}
                                />
                                {`${el.label} (${el.count})`}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Color Section */}
            <div className="filter-section">
                <div className="filter-header" onClick={() => setColorOpen(!isColorOpen)}>
                    <p style={{ fontWeight: '500', fontSize: '15px' }}>Color</p>
                </div>
                {isColorOpen && (
                    <div className="filter-options" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        textAlign: 'left'
                    }}>
                        {colorArr.map((el, id) => (
                            <div key={id} style={{
                                width: '23px',
                                height: '23px',
                                backgroundColor: el,
                                borderRadius: '50%',
                                marginRight: '10px',
                                marginTop: '5px',
                                cursor: 'pointer',
                            }}></div>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Type Section */}
            <div className="filter-section">
                <div className="filter-header" onClick={() => setProductTypeOpen(!isProductTypeOpen)}>
                    <p style={{ fontWeight: '500', fontSize: '15px' }}>Product type</p>
                </div>
                {isProductTypeOpen && (
                    <div className="filter-options">
                        {productTypeArr.map((el, id) => (
                            <label key={id} style={{ color: '#888888', fontWeight: '400', fontSize: '14px' }}>
                                <input
                                    type="checkbox"
                                    checked={productType[`${el.label}`] || false}
                                    onChange={() => handleFilterChange('productType', `${el.label}`, setProductType)}
                                />
                                {`${el.label} (${el.count})`}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <button onClick={() => applyFilters({ availability, moreFilters, brand, color, productType })}>
                Apply Filters
            </button>
        </div>
    );
};

export default Filter;