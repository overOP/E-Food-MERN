import React from 'react'
import Product from '../../components/product/Product'
import { useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
  return (
    <div>
        <Product id={id} />
    </div>
  )
}

export default Details