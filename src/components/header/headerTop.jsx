import React from 'react'
import './headerStyles.css'

const headerTop = () => {
    return (
        <div className='redContainer'>
            <ul className='topLeftHand'>
                <li>Մեր մասին</li>
                <li>Բլոգ</li>
                <li>Կապ</li>
                <li>FAQ</li>
            </ul>

            <p className='saleAbout'>Խնայիր մինչև 20% զեղչ ողջ տեսականու համար օգտագործելով  “SHINFLEX24”պրոմոկոդը</p>
            
            <ul className='currencyExchangeContainer'>
                <select className='currencyExchange'>
                    <option value="AMD">ՀՀ Դրամ (AMD ֏)</option>
                    <option value="RUB">РФ Рубль (RUB ₽)</option>
                    <option value="USD">USA Dollar (USD $)</option>
                </select>
            </ul>
            <ul>
                <select className='currencyExchange' style={{
                    marginTop: '10px',
                }}>
                    <option value="HY">Հայերեն</option>
                    <option value="RU">Русский</option>
                    <option value="EN">English</option>
                </select>
            </ul>
        </div>
    )
}

export default headerTop