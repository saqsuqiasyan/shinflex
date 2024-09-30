import React, { useEffect, useState } from 'react'
import HeaderTop from './headerTop'
import HeaderMain from './headerMain'
import Categories from '../categories/categories'

const Header = () => {
    return (
        <div>
            <HeaderTop />
            <HeaderMain />
            <Categories />
        </div>
    )
}

export default Header