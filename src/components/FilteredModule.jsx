import React, { useEffect, useState } from 'react'
import Filter from './pages/Filter/Filter'
import Products from './pages/HomePage/Products/Products'
import Loading from './loading/Loading'

const FilteredModule = () => {
    const [filterActions, setFilterActions] = useState([])
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://shinflex.am/SFApi/Product/");
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loading />;

    return (
        <div style={{ display: 'flex' }}>
            {!loading && <>
                <Filter setMix={setFilterActions} products={data} />
                <Products mix={filterActions} categoryParam={null} />
            </>}
        </div>
    )
}

export default FilteredModule