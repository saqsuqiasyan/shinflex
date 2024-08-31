import React from 'react'
import Logo from '../../assets/photos/logo.png'
import { FiSearch } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegUser, FaShoppingCart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

const headerMain = () => {
  return (
    <div className='headerMain'>
      <div id='logo'>
        <img src={Logo} alt="ShinFlex" />
      </div>

      <div className='searchItem'>
        <input type="text" placeholder='Որոնել' />
        <FiSearch className='searchIcon' />
      </div>

      <ul className='statsAndInfo'>
        <li>
          <div className='header_data__panel'>
            <FiPhoneCall className='statsIcon' />
            <div >
              <p>Կապ մեզ հետ</p>
              <span><b>+374 00 000 000</b></span>
            </div>
          </div>
        </li>

        <li>
          <div className='header_data__panel'>
            <FaRegUser className='statsIcon' />
            <div >
              <p>My Account</p>
              <span><b>Log in</b></span>
            </div>
          </div>
        </li>

        <li>
          <div className='header_data__panel'>
            <FaCartShopping className='statsIcon' />
            <div >
              <p>Զամբյուղ</p>
              <span><b>0.00 դր.</b></span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default headerMain