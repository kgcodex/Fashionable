import React from 'react'
import Sidebar from './Sidebar'
import Catalog from './Catalog'

const StoreOverview = () => {
  return (
    <div className='bg-white flex-grow  w-full rounded-xl flex flex-row overflow-hidden'>
        <Sidebar />
        <Catalog />

    </div>
  )
}

export default StoreOverview