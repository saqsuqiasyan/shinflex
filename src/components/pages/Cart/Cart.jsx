import { useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import AOS from 'aos';
import Message from '../../Message/Message';

const Cart = ({ show }) => {
    const [data, setData] = useState([]);
    const [isClickable, setIsClickable] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [callRemove, setCallRemove] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [formData, setFormData] = useState({ name: '', surname: '', phone: '' });
    const [lang] = useState(localStorage.getItem('lang') || 'hy');
    const [alertMessage, setAlertMessage] = useState('');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        AOS.init({
            duration: 300,
            once: true,
        });
        document.body.style.overflow = isOrderModalOpen ? 'hidden' : 'auto';
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
        if (data.length && cartItems.length) {
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
        }
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

    const updateCartQuantity = async (id, productId, newQuantity) => {
        const productData = data.find(product => product.id === id);

        if (!productData) return;

        const maxQuantity = productData.count;
        if (newQuantity > maxQuantity) {
            newQuantity = maxQuantity;
            setAlertMessage(false)
            setAlertMessage(handleGetData(lang, [`Only ${maxQuantity} units of ${handleGetData(lang, [productData.name_en, productData.name_ru, productData.name_hy])} are available.`, `Доступно только ${maxQuantity} единиц ${handleGetData(lang, [productData.name_en, productData.name_ru, productData.name_hy])}.`, `Հասանելի են միայն ${maxQuantity} միավոր ${handleGetData (lang, [productData.name_en, productData.name_ru, productData.name_hy])}:`]));
            setIsAlertVisible(true);
        }

        try {
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

            setCallRemove((prev) => !prev);
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const handleIncreaseQuantity = (productId) => {
        const itemsToUpdate = cartItems.filter(item => item.product === productId);
        updateCartQuantity(productId, itemsToUpdate[0].id, itemsToUpdate[0].quantity + 1);
    };

    const handleDecreaseQuantity = (productId) => {
        const itemsToUpdate = cartItems.filter(item => item.product === productId);
        if (itemsToUpdate[0].quantity > 1) {
            updateCartQuantity(productId, itemsToUpdate[0].id, itemsToUpdate[0].quantity - 1);
        } else {
            handleRemoveItem(productId)
        }
    };

    const handleGetData = (lang, [en, ru, hy]) => {
        return lang === 'en' ? en : lang === 'ru' ? ru : hy;
    };

    if (loading) return;
    if (error) console.log(`Error: ${error}`);

    const handleProductClick = (product) => {
        show(false);
        navigate(`/product-details/${product.id}`);
    };

    const handleCheckboxChange = (productId) => {
        setSelectedItems(prevSelected => {
            const newSelectedItems = prevSelected.includes(productId)
                ? prevSelected.filter(id => id !== productId)
                : [...prevSelected, productId];
            return newSelectedItems;
        });
    };

    const handleOrderSubmit = async () => {
        setIsClickable(true);

        if (!formData.name || !formData.surname || !formData.phone) {
            setAlertMessage(false)
            setAlertMessage(handleGetData(lang, ["Please fill in all fields.", "Пожалуйста, заполните все поля.", "Խնդրում ենք լրացնել բոլոր դաշտերը։"]));
            setIsAlertVisible(true);
            setIsClickable(false);
            return;
        }

        if (selectedItems.length === 0) {
            setAlertMessage(false)
            setAlertMessage(handleGetData(lang, ['Please select at least one item.', 'Пожалуйста, выберите хотя бы один пункт.', 'Խնդրում ենք ընտրել առնվազն մեկ տարր:']));
            setIsAlertVisible(true);
            setIsClickable(false);
            return;
        }

        const orderItems = cartItems
            .filter(item => selectedItems.includes(item.product))
            .map(item => {
                const productData = data.find(product => product.id === item.product);
                return {
                    name: productData.name,
                    quantity: item.quantity,
                    price: productData.sale
                        ? (parseFloat(productData.price) * (100 - productData.discount_procent) / 100).toFixed(2)
                        : parseFloat(productData.price).toFixed(2),
                };
            });

        const orderData = {
            name: formData.name,
            surname: formData.surname,
            phone: formData.phone,
            products: orderItems
        };

        try {
            const response = await fetch('https://shinflex.am/SFApi/order/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error('Failed to place order');
            setAlertMessage(false)
            setAlertMessage(handleGetData(lang, ['Order placed successfully!', 'Заказ успешно оформлен!', 'Պատվերը հաջողությամբ կատարվեց:']));
            setIsAlertVisible(true);
            setIsOrderModalOpen(false);
        } catch (error) {
            console.error('Order error:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div className='cart-container'>
            <div className="close" onClick={() => show(false)}></div>
            {isAlertVisible && <Message message={alertMessage} onClose={() => setIsAlertVisible(false)} />}

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
                                            <h3 style={{ color: '#000' }}>{handleGetData(lang, [productData.name_en, productData.name_ru, productData.name_hy])}</h3>
                                            <p style={{ color: '#000', margin: '7px 0' }}>
                                                {item.quantity} x {productData.sale
                                                    ? (parseFloat(productData.price) * ((100 - productData.discount_procent) / 100)).toFixed(2)
                                                    : parseFloat(productData.price).toFixed(2)}դր․
                                            </p>
                                            <button style={{ color: '#000', backgroundColor: '#ddd', padding: '5px 15px', border: 'none', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }} onClick={() => handleDecreaseQuantity(productData.id)}>-</button>
                                            <span style={{ color: '#000', margin: '0 5px' }}>{item.quantity}</span>
                                            <button style={{ color: '#000', backgroundColor: '#ddd', padding: '5px 15px', border: 'none', fontSize: '16px', cursor: 'pointer', borderRadius: '5px' }} onClick={() => handleIncreaseQuantity(productData.id)}>+</button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => handleRemoveItem(productData.id)}
                                        >
                                            <FaTrash color="#DF3030" />
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

                <button className="place-order-btn" onClick={() => setIsOrderModalOpen(true)} style={{
                    width: 'calc(100% - 32px)',
                    marginLeft: '16px',
                    marginBottom: '50px',
                    padding: '10px 0',
                    backgroundColor: '#DF3030',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '20px',
                    borderRadius: '4px',
                    fontSize: '16px',
                    lineHeight: '1',
                    fontWeight: '500'
                }}>
                    {handleGetData(lang, ['Order', 'Заказать', 'Պատվիրել'])}
                </button>

                {isOrderModalOpen && (
                    <div className="order-modal">
                        <div className="order-form">
                            <h2>{handleGetData(lang, ['Place Your Order', 'Оформите заказ', 'Տեղադրեք Ձեր պատվերը'])}</h2>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder={handleGetData(lang, ['Name', 'Имя', 'Անուն'])}
                                autoComplete='off'
                                required
                            />
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                placeholder={handleGetData(lang, ['Surname', 'Фамилия', 'Ազգանուն'])}
                                autoComplete='off'
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder={handleGetData(lang, ['Phone number', 'Номер телефона', 'Հեռախոսահամար'])}
                                autoComplete='off'
                                required
                            />

                            <h3 style={{ color: '#000' }}>{handleGetData(lang, ['Select Items', 'Выбрать продукты', 'Ընտրեք ապրանքներ'])}</h3>
                            <ul>
                                {Object.values(cartItems.reduce((acc, item) => {
                                    const productId = item.product;
                                    if (!acc[productId]) {
                                        acc[productId] = { ...item, quantity: 0 };
                                    }
                                    acc[productId].quantity += item.quantity;
                                    return acc;
                                }, {})).map((item, id) => {
                                    const productData = data.find(product => product.id === item.product);
                                    if (productData) {
                                        return (
                                            <li key={id} style={{ color: '#000' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(item.product)}
                                                    onChange={() => handleCheckboxChange(item.product)}
                                                    id={`select${id}`}
                                                    style={{ cursor: 'pointer', accentColor: '#DF3030' }}
                                                />
                                                <label htmlFor={`select${id}`} style={{ cursor: 'pointer' }}>{handleGetData(lang, [productData.name_en, productData.name_ru, productData.name_hy])} ({item.quantity})</label>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </ul>
                            <button className="submit-order-btn" onClick={handleOrderSubmit} disabled={isClickable}>
                                {handleGetData(lang, ['Order', 'Заказать', 'Պատվիրել'])}
                            </button>
                            <button className="close-modal-btn" onClick={() => setIsOrderModalOpen(false)}>
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;