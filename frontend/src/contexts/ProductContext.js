import {createContext, useContext} from "react"

export const ProductContext = createContext({

    searchProducts:(query)=>{},
    // fetchProduct: (id, setfun)=>{},
    // recommendedProducts: (id)=>{}

})

export const useProduct=()=>{
    return useContext(ProductContext);  
}

export const ProductProvider = ProductContext.Provider;