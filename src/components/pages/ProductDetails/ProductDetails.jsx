import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const { state: product } = useLocation();
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(product.img1);
    const navigate = useNavigate();

    const images = [
        product.img1,
        product.img2 || product.img1,
        product.img3 || product.img1,
        product.img4 || product.img1
    ];

    useEffect(() => {
        setSelectedImage(product.img1)
        scrollTo(0, 0);
        setQuantity(1)
    }, [product])

    const handleQuantityChange = (value) => {
        if (quantity + value > 0) setQuantity(quantity + value);
    };

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handleAddToCart = async () => {
        if (product.count === 0) {
            alert('Out of stock.');
            return;
        }
    
        if (quantity > product.count) {
            alert('You can only add up to the available quantity.');
            return;
        }
    
        const token = localStorage.getItem('token');
    
        if (!token) {
            alert('Please log in to add items to the cart.');
            navigate('/account/login');
            return;
        }
    
        try {
            const cartId = 1;
    
            const response = await fetch('https://shinflex.am/SFApi/cart-items/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart: cartId,
                    product: product.id,
                    quantity,
                }),
            });
    
            if (response.ok) {
                alert('Product added to cart!');
                const currentCartCount = parseInt(localStorage.getItem('cartCount') || '0');
                localStorage.setItem('cartCount', currentCartCount + quantity);
                window.dispatchEvent(new Event('cartUpdated'));
            } else {
                const errorData = await response.json();
                console.error('Failed to add item to cart:', errorData);
                alert('Failed to add item. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    
        navigate('/');
    };    

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    return (
        <div className="product-details-container">
            <div className="left-column">
                <img src={selectedImage} alt={product.name} className="main-image" />
                <div className="image-thumbnails">
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index}`}
                            className={`thumbnail ${selectedImage === img ? 'selected' : ''}`}
                            onMouseEnter={() => handleImageSelect(img)}
                        />
                    ))}
                </div>
            </div>

            <div className="right-column">
                <h1 className="product-title">{handleGetData(lang, [product.name_en, product.name_ru, product.name_hy])}</h1>
                <p className="price">
                    {(parseInt(product.price) * ((100 - product.discount_procent) / 100)).toFixed(2)} դր․
                </p>
                <p className="availability" style={{
                    color: product.count > 0 ? '' : '#df3030',
                    fontWeight: product.count > 0 ? 'normal' : 'bold'
                }}>
                    {product.count > 0 ? handleGetData(lang, ['Available', 'Доступнo', 'Առկա է']) : handleGetData(lang, ['Unavailable', 'Недоступнo', 'Առկա չէ'])}
                </p>

                <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(-1)} style={{ color: '#000' }}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} style={{ color: '#000' }}>+</button>
                </div>

                <div className="button-group">
                    <button className="add-to-cart" onClick={handleAddToCart}>{handleGetData(lang, ['Add to cart', 'Добавить', 'Ավելացնել'])}</button>
                    <button className="buy-now">{handleGetData(lang, ['Buy it now', 'Купить', 'Գնել'])}</button>
                </div>

                <p className="shipping-info">Shipping & Returns</p>
            </div>

            <div className="description">
                <h2>Description</h2>
                <p>{handleGetData(lang, [product.description_en, product.description_ru, product.description_hy])}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
