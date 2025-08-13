import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import api from '../api'


const ProductView = ({product, onClose, onCardClick}) => {

    const [recommendedProductsId, setRecommendedProductsId]= useState({});

    const recommendedProducts = async (id) => {
    try{
      const response = await api.get(`/recommend/${id}`);
      setRecommendedProductsId(response.data || {});
        console.log("Recommended Products:", response.data);

    } catch (error) {
      console.error("Error fetching recommended products", error);
    }
  }

  useEffect(() =>{
    if (product){
        recommendedProducts(product.id);
    }
  },[product])



    if (!product) return null;

  return (
    <div className='fixed inset-0 bg-white mt-20 mb-5 mr-10 ml-10 rounded-xl p-5 flex flex-col overflow-hidden z-50'>

        <div className='flex-shrink-0 mb-5'>
            <button 
            onClick={onClose}
            className='ml-auto block text-2xl font-mono font-semibold rounded-full size-8 hover:bg-gray-300'>&times;</button>
        </div>

        <div className='h-full overflow-auto no-scrollbar'>

            <div className='flex flex-row justify-around items-center mb-10'>

                <div className=' flex-shrink-0 relative group h-80 w-60 mt-25 ml-25'>
                    
                    <div className='absolute inset-0  rounded-xl ring-4 group-hover:shadow-2xl z-10'>
                        <img src={product?.images?.back_image_url} alt="img" className='object-contain rounded-xl'  />
                    </div>
                    <div className='absolute inset-0  rounded-xl ring-4 group-hover:shadow-2xl z-20 origin-bottom-left transition-all duration-300 ease-in-out group-hover:z-0 group-hover:-rotate-15 group-hover:scale-110'>
                        <img src={product?.images?.front_image_url} alt="img" className='object-contain rounded-xl' />
                    </div>
                </div> 
                
                <div className='flex flex-col justify-between items-start ml-20'>
                    <p className='font-sriracha font-bold text-4xl pb-5'>{product?.brandName}</p>
                    <p className='font-mono font-semibold text-xl'>{product?.productDisplayName}</p>
                    <p className='font-mono font-light line-clamp-3 '>{product?.description}</p> 
                    <p className='font-mono font-bold text-2xl pt-4'>₹:{product?.price}</p> 

                    <div className='flex flex-row justify-around items-center mt-10 '>
                        <button className='mr-5 bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:ring-2 hover:ring-black'>Buy Now</button>
                        <button className='bg-black text-white p-2 rounded-lg hover:bg-white hover:text-black hover:ring-2 hover:ring-black'>Add to Cart</button>
                
                    </div>
                </div>

            </div>

            <h1 className='font-mono font-semibold text-2xl'>Recommended For You</h1>

            
            <div className=' flex flex-row overflow-x-auto no-scrollbar'>
                {recommendedProductsId?.product_ids?.map((id) => 
                    (<ProductCard key={id} productId={id} onCardClick={onCardClick} />)
                )}
                

            </div>
            


        </div>
            

        
    </div>
  )
}

export default ProductView