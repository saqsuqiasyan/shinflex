import React from 'react';
import './CompareMessage.css';
import { Link } from 'react-router-dom'

function CompareMessage() {
  const lang = localStorage.getItem('lang') || 'hy';

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy;
  };

  return (
    <div className="compare-message-container">
      <div>
        <p className="compare-message-text">{handleGetData(lang, ['No products were added to your compare.', 'В сравнение не добавлено ни одного продукта.', 'Ոչ մի ապրանք չի ավելացվել ձեր համեմատությանը:'])}</p>
        <Link to='/collections/sale-collection/_'><button className="compare-message-button">{handleGetData(lang, ['Continue shopping', 'Продолжить покупки', 'Շարունակեք գնումներ կատարել'])}</button></Link>
      </div>
    </div>
  );
}

export default CompareMessage;
