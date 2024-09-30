import React from "react";
import "swiper/swiper-bundle.css";
import Example from '../../../../assets/photos/24.jpg.png'
import "./Products.css";

const product = {
    imageUrl: Example,
    title: "Milwaukee 2458-21 M12 Cordless Palm Nailer",
    price: "1000֏",
}

const Products = () => {
    return (
        <div className="slider-container" id="all">
            {new Array(20).fill(product).map((product, id) => (
                <div className="product-card" key={id}>
                    <img src={product.imageUrl} alt={product.title} className="product-image" />
                    <h3>{product.title}</h3>
                    <div className="product-price">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '20px', color: '#df3030', fontWeight: 'bold' }}>{product.price}</span>
                            <span style={{ marginRight: '15px', color: '#006FCF' }}>Առկա է</span>
                        </div>
                    </div>
                    <button className="add-to-cart">Ավելացնել</button>
                </div>
            ))}
        </div>
    )
}

export default Products;
