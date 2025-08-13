import React from 'react'
import { useState } from 'react';
import { useProduct } from '../contexts';

import search from '/search.svg'
import shopping_cart from '/shopping_cart.svg'
import account from '/account.svg'

const Navbar = () => {

    const [query, setQuery]= useState("");

    const {searchProducts} = useProduct();

    const handleSearch = (e) =>{
        if (e.key == 'Enter' && query.trim() !== '') {
            searchProducts(query);
            setQuery('');
        }
    }
    
  return (
    <nav className='flex flex-row h-auto w-full rounded-xl bg-white py-3 items-center '>
        <div className='basis-1/4'>
            <h2 className='text-2xl font-sriracha ml-7'>Fashionable</h2>
        </div>
        <div className='basis-1/2 bg-gradient-to-r from-gray-600 via-gray-400 to-white rounded-md p-0.5 overflow-hidden'>
            <div className='flex flex-row justify-start items-center rounded-md bg-white'>
                <img src={search} alt="search icon"
                    className='ml-3' />
                <input type="text"
                    placeholder='Search for topwear, Childwear...'
                    className='focus:outline-none mx-3' 
                    value={query}
                    onChange ={(e)=> setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    />
            </div>
        </div>
        <div className='basis-1/4 flex justify-end items-center mr-10  gap-5'>
            <div className='hover:animate-bounce'>
                <img src={shopping_cart} alt="shopping cart" />
            </div>
            <div className='flex flex-row flex-wrap items-center justify-around gap-2 hover:text-violet-950'>
                <img src={account} alt="account" />
                <p className='text-md font-black font-mono visible max-md:hidden'>Hi,Kunal Goel</p>
            </div>
        </div>

    </nav>
  )
}

export default Navbar