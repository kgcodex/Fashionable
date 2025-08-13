import React from 'react'
import { useProduct } from '../contexts'

import Sidebar from './Sidebar'
import Catalog from './Catalog'

import Products from './Products'
import ProductView from './ProductView'


const StoreOverview = () => {
  const { productsId } = useProduct();

  if (Object.keys(productsId).length === 0){
    return (
      <div className='bg-white flex-grow flex flex-row w-full rounded-xl  overflow-hidden'>
        < Sidebar />
        <Catalog />

      </div>
    )
  } else {
    return (
      <Products productsId={productsId}/>
    )
  }
}

export default StoreOverview