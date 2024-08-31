import React from 'react'
import HeaderTop from './headerTop'
import HeaderMain from './headerMain'
import Categories from '../categories/categories'

const header = () => {
    return (
        <div>
            <HeaderTop />
            <HeaderMain />
            <Categories />
        </div>
    )
}

export default header