import React, { useEffect, useState } from 'react'
import Filter from '../Filter/Filter.jsx'
import Products from '../HomePage/Products/Products.jsx'
import { useLocation, useParams } from 'react-router-dom'
import Loading from '../../loading/Loading.jsx'

const CollectionsPage = () => {
  // const { category } = useParams();
  const { categoryID } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [filterActions, setFilterActions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://shinflex.am/SFApi/Product/");
        const result = await response.json();
        const filtered = categoryID !== '_' ? result.filter(item => item.category == categoryID) : result;
        setProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location]);

  if (loading) return <Loading />;

  return (
    <div style={{ display: 'flex' }}>
      <Filter setMix={setFilterActions} products={products} />
      <Products mix={filterActions} categoryParam={categoryID !== '_' ? categoryID : null} />
    </div>
  )
}

export default CollectionsPage