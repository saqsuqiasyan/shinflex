import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../../assets/photos/logo1.png'
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <img src={logo2} alt="ShinFlex" />
                    <p>Այստեղ կարող եք գտնել տան եւ շինարարության համար անհրաժեշտ բոլոր տեսակի ապրանքները:</p>
                    <p>Shop On Map</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-pinterest"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                <div className="footer-help">
                    <h3>Need Help?</h3>
                    <p>📞 +374 00-000-000</p>
                    <p>Monday – Friday : 9:00 – 18:00</p>
                    <p>Saturday : 09:00 – 14:00</p>
                    <p>✉️ info@shinflex.am</p>
                </div>

                <div className="footer-links">
                    <div>
                        <h3>Information</h3>
                        <ul>
                            <li>
                                <Link to='/pages/about-us' className='link'>About Us</Link>
                            </li>
                            <li>
                                <Link to='/pages/contact' className='link'>Contact</Link>
                            </li>
                            <li>
                                <Link to='/pages/compare' className='link'>Compare</Link>
                            </li>
                            <li>
                                <Link to='/pages/faq' className='link'>FAQ</Link>
                            </li>
                            <li>
                                <Link to='/pages/wishlist' className='link'>Wishlist</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3>Quick links</h3>
                        <ul>
                            <li>Contact Information</li>
                            <li>Privacy Policy</li>
                            <li>Refund Policy</li>
                            <li>Shipping Policy</li>
                            <li>Terms of Service</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Extra links</h3>
                        <ul>
                            <li>Our Store</li>
                            <li>Accessories</li>
                            <li>Hammers</li>
                            <li>Washers</li>
                            <li>Pounding</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>Powered by Global IT Academy &copy; 2024</p>
                <div className="payment-icons">
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-amex"></i>
                    <i className="fab fa-cc-paypal"></i>
                    <i className="fab fa-cc-discover"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
