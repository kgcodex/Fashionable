import React, { useState } from 'react'
import ProductCard from './ProductCard'
import ProductView from './ProductView'

const Products = ({productsId}) => {

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleCardClick = (productData) => {
    setSelectedProduct(productData);
  }

  const handleCloseView = () => {
    setSelectedProduct(null);
  };

  return (
    <div className='bg-white  h-full w-full rounded-xl flex flex-wrap overflow-auto pr-5'>

        {productsId["product_ids"].map((id) => 
          (<ProductCard key={id} productId={id} onCardClick={handleCardClick} />)
        )}

        { selectedProduct && (
          <ProductView
            product={selectedProduct}
            onClose={handleCloseView}
            onCardClick={handleCardClick}
            />
        )}
        
        

    </div>
  )
}

export default Products