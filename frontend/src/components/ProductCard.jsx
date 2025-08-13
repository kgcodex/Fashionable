import React, { useEffect, useState } from 'react'
import api from '../api'

const ProductCard = ({ productId, onCardClick}) => {

  const [productDetails, setProductDetails] = useState({});

  const fetchProduct = async (id) => {
    try{
      const response = await api.get(`/fetch_product_info/${id}`);
      setProductDetails(response.data || {});

    } catch (error){
      console.error("Error fetching product details", error);
    }
  }

  useEffect(() => {
      if (productId){
        fetchProduct(productId);
      }
    }, [productId]);

  return (
    <div 
    className='flex-shrink-0 relative bg-gray-50 shadow-lg shadow-gray-200 flex flex-col justify-around h-100 w-70 p-5 rounded-xl mt-5  ml-5 overflow-hidden '
    onClick={() => onCardClick(productDetails)}>

        <div className='absolute h-170 w-70 bg-gray-200 -rotate-40 -right-30 z-0 '></div>
        <div className='bg-white rounded-xl z-1'>
            <img src={productDetails?.images?.front_image_url} alt="image" className='h-50 w-full object-contain' />
        </div>

        <div className='pt-5 z-1'>
            <p className='font-mono font-semibold line-clamp-1'>{productDetails?.productDisplayName}</p>
            <p className='font-mono '>{productDetails?.masterCategoryType}</p>
            <p className='font-mono font-semibold text-xl'>{productDetails?.price}</p>

            <div className='flex flex-row justify-around pt-2'>
              <button className='bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:ring-2 hover:ring-black'>Buy Now</button>
              <button className='bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:ring-2 hover:ring-black'>Add to Cart</button>
            </div>       
        </div>

    </div>
  )
}

export default ProductCard