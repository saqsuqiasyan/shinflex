import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; // Correct Swiper import
import "swiper/swiper-bundle.css";
import Example from '../../../../assets/photos/11_03.webp'
import "./TopSuggestions.css";

const product = {
    imageUrl: Example,
    title: "Milwaukee 2458-21 M12 Cordless Palm Nailer",
    price: "1000֏",
    oldPrice: "2000֏",
    discount: "-20%",
}

const TopSuggestions = () => {
    return (
        <div className="slider-container">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>ԹՈՓ ԱՌԱՋԱՐԿՆԵՐ</h2>
                <div className="slider-buttons">
                    <button className="prev-btn">&lt;</button>
                    <button className="next-btn">&gt;</button>
                </div>
            </div>
            <Swiper
                spaceBetween={10}
                slidesPerView={4}
                navigation={{
                    prevEl: ".prev-btn",
                    nextEl: ".next-btn",
                }}
                modules={[Navigation]}
                simulateTouch={true}
                touchRatio={1}
                grabCursor={true}
                breakpoints={{
                    1024: {
                        slidesPerView: 6,
                    },
                    600: {
                        slidesPerView: 2,
                    },
                    300: {
                        slidesPerView: 1,
                    },
                }}
                className="product-swiper"
            >
                {new Array(12).fill(product).map((product, id) => (
                    <SwiperSlide key={id}>
                        <div className="product-card">
                            <div className="product-discount">{product.discount}</div>
                            <img src={product.imageUrl} alt={product.title} className="product-image" />
                            <h3>{product.title}</h3>
                            <div className="product-price">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '20px', color: '#df3030', fontWeight: 'bold' }}>{product.price}</span>
                                    <span style={{ marginRight: '15px', color: '#006FCF' }}>Առկա է</span>
                                </div>
                                <span className="old-price">{product.oldPrice}</span>
                            </div>
                            <button className="add-to-cart">Ավելացնել</button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default TopSuggestions;
