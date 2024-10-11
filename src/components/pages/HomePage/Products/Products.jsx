import React, { useState } from "react";
import "swiper/swiper-bundle.css";
import Example from '../../../../assets/photos/24.jpg.png'
import "./Products.css";

const product = {
    imageUrl: Example,
    title: "Milwaukee 2458-21 M12 Cordless Palm Nailer",
    price: "1000֏",
};

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;

    const allProducts = new Array(70).fill(product);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const leftMostPage = Math.max(1, currentPage - 2);
        const rightMostPage = Math.min(totalPages, currentPage + 2);

        if (leftMostPage > 1) {
            pageNumbers.push(1);
            if (leftMostPage > 2) pageNumbers.push("...");
        }

        for (let i = leftMostPage; i <= rightMostPage; i++) {
            pageNumbers.push(i);
        }

        if (rightMostPage < totalPages) {
            if (rightMostPage < totalPages - 5) pageNumbers.push("...");
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="products-container">
            <div className="slider-container">
                {currentProducts.map((product, id) => (
                    <div className="product-card" key={id}>
                        <img src={product.imageUrl} alt={product.title} className="product-image" />
                        <h3>{product.title}</h3>
                        <div className="product-price">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '20px', color: '#df3030', fontWeight: 'bold' }}>
                                    {product.price}
                                </span>
                                <span style={{ marginRight: '15px', color: '#006FCF' }}>Առկա է</span>
                            </div>
                        </div>
                        <button className="add-to-cart">Ավելացնել</button>
                    </div>
                ))}
            </div>

            <div className="pagination">
                {currentPage > 1 && <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    className="pagination-button"
                >
                    &lt;
                </button>}

                {getPageNumbers().map((number, index) => (
                    <button
                        key={index}
                        onClick={() => number !== "..." && paginate(number)}
                        className={`pagination-button ${currentPage === number ? "active" : ""}`}
                        disabled={number === "..."}
                    >
                        {number}
                    </button>
                ))}

                {currentPage < totalPages && <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    className="pagination-button"
                >
                    &gt;
                </button>}
            </div>
        </div>
    );
};

export default Products;