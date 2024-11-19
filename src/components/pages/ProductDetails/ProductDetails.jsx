import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Cart from '../Cart/Cart';
import Loading from '../../loading/Loading';
import Message from '../../Message/Message';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [cart, setCart] = useState(null);
    const [token] = useState(localStorage.getItem('token'));
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://shinflex.am/SFApi/cart-items/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                setCart(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch('https://shinflex.am/SFApi/Product/');
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data.filter(product => product.id === parseInt(id)));
                    setSelectedImage(data.filter(product => product.id === parseInt(id))[0].img1);
                } else {
                    console.error('Failed to fetch product data.');
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
        setQuantity(1);
    }, [id]);

    const handleAvailability = (id, quantity) => {
        let prod = product.filter(product => product.id === parseInt(id));
        let updatedCart = cart.filter(item => item.product === parseInt(id));
        const totalQuantity = updatedCart.reduce((sum, item) => sum + item.quantity, 0);

        if (totalQuantity + quantity <= prod[0].count) return true;
        return false;
    }

    if (!product) {
        return <Loading />
    }

    const images = [product[0].img1];
    product[0].img2 && images.push(product[0].img2);
    product[0].img3 && images.push(product[0].img3);
    product[0].img4 && images.push(product[0].img4);

    const handleQuantityChange = (value) => {
        if (quantity + value > 0) setQuantity(quantity + value);
    };

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const handleAddToCart = async () => {
        if (product[0].count === 0) {
            setAlertMessage(false)
            setAlertMessage(handleGetData(lang, ['Out of stock.', 'Распродано.', 'Առկա չէ']));
            setIsAlertVisible(true);
            return;
        }

        if (quantity > product[0].count) {
            setAlertMessage(false)
            setAlertMessage(handleGetData(lang, ['You can only add up to the available quantity.', 'Вы можете добавлять только доступное количество.', 'Դուք կարող եք ավելացնել միայն առկա քանակին:']));
            setIsAlertVisible(true);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/account/login');
            return;
        }

        try {
            if (handleAvailability(id, quantity)) {
                const cartId = 1;
                const response = await fetch('https://shinflex.am/SFApi/cart-items/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cart: cartId,
                        product: id,
                        quantity,
                    }),
                });

                if (response.ok) {
                    setAlertMessage(false)
                    setAlertMessage(handleGetData(lang, ['Product added to cart!', 'Товар добавлен в корзину!', 'Ապրանքը ավելացված է զամբյուղում:']));
                    setIsAlertVisible(true);
                    setTimeout(() => {
                        setCartOpen(true);
                    }, 100);
                    const currentCartCount = parseInt(localStorage.getItem('cartCount') || '0');
                    localStorage.setItem('cartCount', currentCartCount + quantity);
                    window.dispatchEvent(new Event('cartUpdated'));
                } else {
                    const errorData = await response.json();
                    console.error('Failed to add item to cart:', errorData);
                    setAlertMessage(false)
                    setAlertMessage(handleGetData(lang, ['Failed to add item. Please try again.', 'Не удалось добавить элемент. Попробуйте еще раз.', 'Չհաջողվեց ավելացնել տարրը: Խնդրում ենք կրկին փորձել:']));
                    setIsAlertVisible(true);
                }
            } else {
                setAlertMessage(false)
                setAlertMessage(handleGetData(lang, ['Failed to add item. Too much items in cart.', 'Не удалось добавить товар. Слишком много товаров в корзине.', 'Չհաջողվեց ավելացնել տարրը: Չափազանց շատ ապրանքներ զամբյուղում:']));
                setIsAlertVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setAlertMessage(false)
            setAlertMessage(handleGetData(lang, ['An error occurred. Please try again later.', 'Произошла ошибка. Попробуйте еще раз позже.', 'Սխալ է տեղի ունեցել: Խնդրում ենք փորձել ավելի ուշ:']));
            setIsAlertVisible(true);
        }

        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="product-details-container">
            {isAlertVisible && <Message message={alertMessage} onClose={() => setIsAlertVisible(false)} />}
            <div style={{ position: 'absolute', zIndex: '-9999', opacity: '0' }}>
                {cartOpen && <Cart show={() => setCartOpen(false)} />}
            </div>

            <div className="left-column">
                <img
                    src={selectedImage}
                    alt={product[0].name}
                    className="main-image"
                    onClick={openModal}
                />
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
                <h1 className="product-title">{handleGetData(lang, [product[0].name_en, product[0].name_ru, product[0].name_hy])}</h1>
                <p className="price">
                    {(parseInt(product[0].price) * ((100 - product[0].discount_procent) / 100)).toFixed(2)} դր․
                </p>
                <p className="availability" style={{
                    color: product[0].count > 0 ? '' : '#df3030',
                    fontWeight: product[0].count > 0 ? 'normal' : 'bold'
                }}>
                    {product[0].count > 0 ? handleGetData(lang, ['Available', 'Доступнo', 'Առկա է']) : handleGetData(lang, ['Unavailable', 'Недоступнo', 'Առկա չէ'])}
                </p>

                <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(-1)} style={{ color: '#000' }}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange(1)} style={{ color: '#000' }}>+</button>
                </div>

                <div className="button-group">
                    <button className="add-to-cart" onClick={handleAddToCart}>{handleGetData(lang, ['Add to cart', 'Добавить', 'Ավելացնել'])}</button>
                </div>

                <Link to='/policies/refund-policy' className="shipping-info">{handleGetData(lang, ['Shipping & Returns', 'Доставка и возврат', 'Առաքում և վերադարձ'])}</Link>
            </div>

            <div className="description">
                <h2>{handleGetData(lang, ['Description', 'Описание', 'Նկարագրություն'])}</h2>
                <p>{handleGetData(lang, [product[0].description_en, product[0].description_ru, product[0].description_hy])}</p>
            </div>

            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <img src={selectedImage} alt="Full screen" className="modal-image" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
