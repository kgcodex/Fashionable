import { useState } from 'react'
import Navbar from './components/Navbar'

import StoreOverview from './components/StoreOverview'
import { ProductProvider } from './contexts'

import api from './api'



function App() {
  const [productsId, setProductsId]= useState({});
  
  const searchProducts = async (query)=>{
    try{
      const response = await api.get(`/products/${query}`);
      console.log("Search Results:", response.data);
      setProductsId(response.data || {});

    } catch (error){
      console.error("Error fetching products", error);
    }
  }

  return (
    <ProductProvider value={{productsId, searchProducts }}>
      <div className="bg-gray-100 h-screen w-full p-5 flex flex-col gap-5">
        <Navbar />
        <StoreOverview />
      </div>
    </ProductProvider>
  )
}

export default App
