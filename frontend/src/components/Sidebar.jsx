import React from 'react'
import  laundry from '../assets/laundry.png'
import flash from '../assets/flash.png'
import giftbox from '../assets/giftbox.png'
import motivation from '../assets/motivation.png'
import sneakers from '../assets/sneakers.png'
import tracksuit from '../assets/tracksuit.png'
import travelling from '../assets/travelling.png'
import helpdesk from '../assets/helpdesk.png'

const Sidebar = () => {
  return (
    <div className='w-1/4 bg-white rounded-xl flex flex-col'>
        <h1 className='font-sriracha text-4xl text-left ml-5 flex-shrink-0 mb-10 px-10 pt-5'>Explore</h1>

        <div className='overflow-auto space-y-10 px-10 pb-5 '>
            <div className='flex flex-row items-center gap-2  '>
                <img src={flash} alt="Clothing" className='size-7' />
                <p className='font-sriracha text-xl'>New In</p>
                
            </div>
    
            <div className='flex flex-row items-center gap-2  '>
                <img src={laundry} alt="Clothing" className='size-7' />
                <p className='font-sriracha text-xl'>Clothing</p>
            </div>
    
            <div className='flex flex-row items-center gap-2 '>
                <img src={sneakers} alt="Clothing" className='size-7' />
                <p className='font-sriracha text-xl'>Shoes</p>
            </div>
    
            <div className='flex flex-row items-center gap-2  '>
                <img src={travelling} alt="Clothing" className='size-7' />
                <p className='font-sriracha text-xl'>Accessories</p>
            </div>

            <div className='flex flex-row items-center gap-2  '>
                <img src={tracksuit} alt="Clothing" className='size-7' />
                <p className='font-sriracha text-xl'>Activewear</p>
            </div>
    
            <div className='flex flex-row items-center gap-2  '>
                <img src={giftbox} alt="Clothing" className='size-7' />
                <p className='font-sriracha text-xl'>Gifts & Living</p>
            </div>
    
            <div className='flex flex-row items-center gap-2 '>
                <img src={motivation} alt="Clothing" className='size-7' />
                <p className='font-sriracha text-xl'>Inspiration</p>
            </div>
            
        </div>

        <div className='flex flex-row items-center gap-2 px-10 mt-auto mb-10'>
                <img src={helpdesk} alt="Clothing" className='size-7 mt-5' />
                <p className='font-sriracha text-xl mt-5'>Help Center</p>
            </div>   

        



        
    </div>
  )
}

export default Sidebar