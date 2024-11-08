import { useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import AOS from 'aos';

const Cart = ({ show }) => {
    const [data, setData] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [callRemove, setCallRemove] = useState(false);
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
        });

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Product/");
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('https://shinflex.am/SFApi/cart-items/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.removeItem('token');
                        show(false);
                        navigate('/account/login');
                    } else {
                        console.log('Failed to fetch cart items.');
                    }
                    return;
                }

                const data = await response.json();

                const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
                localStorage.setItem('cartCount', totalQuantity);
                setCartItems(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchCartItems();
        } else {
            show(false);
            navigate('/account/login');
        }
    }, [token, callRemove]);

    useEffect(() => {
        const total = cartItems.reduce((total, item) => {
            const productData = data.find(el => el.id === item.product);
            if (!productData) return total;

            return total + (productData.sale
                ? item.quantity * (parseFloat(productData.price) * (100 - productData.discount_procent) / 100)
                : item.quantity * parseFloat(productData.price));
        }, 0);

        setTotalPrice(total);
        localStorage.setItem('totalPrice', total.toFixed(2));
        window.dispatchEvent(new Event('cartUpdated'));
    }, [cartItems, data]);

    const deleteItemFromCart = async (productId) => {
        try {
            const response = await fetch(`https://shinflex.am/SFApi/cart-items/${productId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete item from cart');
            }

            setCartItems((prevItems) => {
                const updatedItems = prevItems.filter(item => item.product !== productId);

                const totalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
                localStorage.setItem('cartCount', totalQuantity);

                return updatedItems;
            });

            setCallRemove((prev) => !prev);
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            const itemsToRemove = cartItems.filter(item => item.product === productId);

            await Promise.all(
                itemsToRemove.map(async (item) => {
                    await deleteItemFromCart(item.id);
                })
            );

        } catch (error) {
            console.error('Failed to remove items from cart:', error);
        }
    };

    const updateCartQuantity = async (productId, newQuantity) => {
        try {
            console.log('Updating quantity for product:', productId);
    
            const response = await fetch(`https://shinflex.am/SFApi/cart-items/${productId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            
    
            if (!response.ok) {
                throw new Error('Failed to update cart quantity');
            }
    
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.product === productId ? { ...item, quantity: newQuantity } : item
                )
            );
            
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };
    
    const handleIncreaseQuantity = (productId, currentQuantity) => {
        updateCartQuantity(productId, currentQuantity + 1);
    };
    
    const handleDecreaseQuantity = (productId, currentQuantity) => {
        if (currentQuantity > 1) {
            updateCartQuantity(productId, currentQuantity - 1);
        }
    };

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    if (loading) return;
    if (error) console.log(`Error: ${error}`);

    const handleProductClick = (product) => {
        show(false);
        navigate('/product-details', { state: product });
    };

    return (
        <div className='cart-container'>
            <div className="close" onClick={() => show(false)}></div>

            <div className="cart-drawer" data-aos='fade-left'>
                <div id='cart-top'>
                    <h3>{handleGetData(lang, ['Shopping Cart', 'Корзина', 'Գնումների զամբյուղ'])}</h3>
                    <span className="close-icon" onClick={() => show(false)}>
                        ✕
                    </span>
                </div>
                {!(cartItems.length > 0) ? (
                    <p>{handleGetData(lang, ['Your cart is empty', 'Ваша корзина пуста', 'Ձեր զամբյուղը դատարկ է'])}</p>
                ) : (
                    <ul className="cart-items" style={{ marginTop: '70px' }}>
                        {Object.values(cartItems.reduce((acc, item) => {
                            const productId = item.product;
                            if (!acc[productId]) {
                                acc[productId] = { ...item, quantity: 0 };
                            }
                            acc[productId].quantity += item.quantity;
                            return acc;
                        }, {})).map((item, idx) => {
                            const productData = data.find(el => el.id === item.product);
                            if (productData) {
                                return (
                                    <li key={idx} className="cart-item">
                                        <img src={productData.img1} alt={productData.name} onClick={() => handleProductClick(data[productData.id - 1])} />
                                        <div>
                                            <h3 style={{ color: '#000' }}>{productData.name}</h3>
                                            <p style={{ color: '#000' }}>
                                                {item.quantity} x {productData.sale
                                                    ? (parseFloat(productData.price) * ((100 - productData.discount_procent) / 100)).toFixed(2)
                                                    : parseFloat(productData.price).toFixed(2)}դր․
                                            </p>
                                            <button style={{color: 'red', backgroundColor: 'transparent', padding: '0 5px', border: 'none', fontSize: '20px'}} onClick={() => handleDecreaseQuantity(productData.id, item.id)}>-</button>
                                            <button style={{color: '#000', backgroundColor: 'transparent', padding: '0 5px', border: 'none', fontSize: '20px'}} onClick={() => handleIncreaseQuantity(productData.id, item.id)}>+</button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemoveItem(productData.id)}
                                        >
                                            <FaTrash color="red" />
                                        </button>
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                )}
                <div className="cart-summary">
                    <p>{handleGetData(lang, ['Total Price: ', 'Общая стоимость: ', 'Ընդհանուր գինը: ']) + totalPrice.toFixed(2)}դր․</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;