import React from 'react';
import './CompareMessage.css';
import { Link } from 'react-router-dom'

function CompareMessage() {
  return (
    <div className="compare-message-container">
      <div>
        <p className="compare-message-text">No products were added to your compare.</p>
        <Link to='/collections/sale-collection/_'><button className="compare-message-button">Continue shopping</button></Link>
      </div>
    </div>
  );
}

export default CompareMessage;
