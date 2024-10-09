import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import Special from '../categoriesHovers/special/special';
import AOS from 'aos';
import PropTypes from 'prop-types';

const SpecialX = (props) => {
    const [hover, setHover] = useState(false);
    const hoverTimeout = useRef(null);

    const handleMouseEnter = () => {
        if (hoverTimeout.current) {
            clearTimeout(hoverTimeout.current);
            hoverTimeout.current = null;
        }
        setHover(true);
    };

    const handleMouseLeave = () => {
        hoverTimeout.current = setTimeout(() => {
            setHover(false);
        }, 200);
    };

    useEffect(() => {
        AOS.init({
            duration: 300,
            once: true,
        });
    }, []);

    return (
        <>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ height: '100%', lineHeight: '60px' }}
            >
                <Link to='/collections/sale-collection' style={{ color: '#000', textDecoration: 'none' }} onClick={() => setHover(false)}>
                    {props.label}
                </Link>
                <span className='sale'>sale</span> <IoIosArrowDown className='arrow' style={{ marginTop: '20px' }} />

                {hover && (
                    <Special />
                )}
            </div>
        </>
    );
}

SpecialX.propTypes = {
    label: PropTypes.string.isRequired
};

export default SpecialX;
