import React from 'react';
import { FaWrench } from "react-icons/fa";
import { FaHammer } from "react-icons/fa";
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-animation">
                <div className="loading-tools">
                    <div className="wrench">
                        <FaWrench />
                    </div>
                    <div className="hammer">
                        <FaHammer />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
