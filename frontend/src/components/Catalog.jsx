import React from 'react'

import flash from '../assets/flash.png'
import businesswoman from '../assets/businesswoman.png'
import youngman from '../assets/young-man.png'

import sort from '/sort.svg'
import filter from '/filter.svg'
import jacket from '../assets/jacket_img.png'

import winterjacket from '../assets/jacket.png'
import scarf from '../assets/scarf.png'
import sneakers from '../assets/sneakers_img.png'

import shoes from '../assets/sneakers.png'
import tracksuit from '../assets/tracksuit.png'
import giftbox from '../assets/giftbox.png'
import gloves from '../assets/gloves.png'




const Catalog = () => {
  return (
    <div className='h-full w-3/4 bg-white rounded-xl mt-5 flex flex-col'>

      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center' >
          <img src={flash} alt="New In" className='size-10'/>
          <p className='font-sriracha text-2xl'>New In</p>
        </div>

        <div className='flex flex-row items-center gap-2'>
          <button className='flex flex-row items-center hover:bg-gray-100 p-2 rounded-xl'>
            <img src={businesswoman} alt="women" className='size-7'/>
            <p className='font-semibold'>Women</p>
          </button>

          <button className='flex flex-row items-center hover:bg-gray-100 p-2 rounded-xl'>
            <img src={youngman} alt="men" className='size-7'/>
            <p className='font-semibold'>Men</p>
          </button>

          <button className='flex flex-row items-center hover:bg-gray-100 p-2 rounded-xl  '>
            <img src={sort} alt="sort" className='size-6'/>
            <p className='font-semibold'>Sort</p>
          </button>

          
          <button className='flex flex-row items-center hover:bg-gray-100 p-2 rounded-xl mr-5'>
            <img src={filter} alt="filter" className='size-6'/>
            <p className='font-semibold'>Filter</p>
          </button>
        </div>
      </div>

      
      <div className='grid  grid-flow-col grid-rows-4 gap-4 mt-5 grid-cols-4 flex-grow mr-5'>

        <div className='row-span-1 col-span-2  bg-cyan-300  relative overflow-hidden rounded-xl flex justify-center items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>
          <img src={flash} alt="flash" className='absolute size-30 rotate-120 -bottom-10 -right-10 '/>
          <img src={flash} alt="flash" className='absolute size-30 -rotate-50 -top-10 -left-10 '/>
          <img src={flash} alt="flash" className='absolute size-30 rotate-20 -top-10 -right-10'/>
          <img src={flash} alt="flash" className='absolute size-30 rotate-210 -bottom-10 -left-10'/>
          <p className='font-bold font-mono text-3xl '>GET UPTO 50% OFF</p>
        </div>

        <div className='row-span-1 col-span-2 bg-purple-300 relative overflow-hidden rounded-xl flex flex-col justify-center items-start transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>
          <p className='font-bold font-mono text-xl ml-5'>Winter Weekends</p>
          <p className='font-semibold font-mono text-md ml-5'>Keep it Casual</p>
          <img src={winterjacket} alt="jacket" className='absolute size-40 right-10'/>

        </div>

        <div className='row-span-2 col-span-1 bg-blue-100  relative overflow-hidden rounded-xl flex flex-col justify-end items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>
          <img src={scarf} alt="scarf" className='absolute top-10 size-30' />
          <p className='font-bold font-mono text-xl text-center'>Scarfs and Accessories</p>
          <p className='font-semibold font-mono text-md mb-20 text-center '>Stay warm and Fashionable</p>
        </div>

        <div className='row-span-2 col-span-1 bg-cyan-300  relative overflow-hidden rounded-xl flex flex-col justify-end items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>
          <div className='absolute rounded-full bg-blue-100 -top-10 size-55'></div>
          <img src={shoes} alt="shoes" className='absolute -top-15 -rotate-35' />
          <p className='font-bold font-mono text-xl text-center '>Comfortable</p>
          <p className='font-semibold font-mono text-md mb-30 text-center'>Affordable as well</p>
        </div>

        <div className='row-span-2 col-span-1 bg-gray-100  relative overflow-hidden rounded-xl flex flex-col justify-end items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>
          <img src={sneakers} alt="sneakers" className='absolute size-35 brightness-150 top-2  '/>
          <p className='font-bold font-mono text-xl text-center'>Adidas Original LXCON 96</p>
          <p className='font-semibold font-mono text-md text-center mb-20'>Luxury and Style</p>
        </div>

        <div className='row-span-1 col-span-2 bg-yellow-200 relative overflow-hidden rounded-xl flex flex-col justify-center items-start transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>
          <div className='absolute bg-orange-300 rounded-full size-60 -right-10 -top-20'></div>
          <img src={jacket} alt="jacket" className='absolute size-40 right-10'/>
          <p className='font-bold font-mono text-2xl ml-5 '>New in Knitwear</p>
          <p className='font-semibold font-mono text-md ml-5 '>Layer. On Layers</p> 
        </div>

        <div className='row-span-1 col-span-2 bg-pink-400  relative overflow-hidden rounded-xl flex justify-start transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>
          <img src={giftbox} alt="giftbox" className='absolute size-20  top-1 right-5'/>
          <img src={gloves} alt="gloves" className='absolute size-25  -bottom-5 left-5'/>
          <p className='font-bold font-mono text-2xl m-5'>For Your Family and <br/> Friends</p>
        </div>

        <div className='row-span-2 col-span-1 bg-red-400  relative overflow-hidden rounded-xl flex flex-col justify-end items-center transition delay-100 duration-200 ease-in-out hover:-translate-y-1 hover:scale-110'>
          <div className='absolute rounded-full size-50 bg-red-200 top-1'></div>
          <img src={tracksuit} alt="tracksuit" className='absolute top-10 left-13 scale-125 scale-x-160 '/>
          <p className='font-bold font-mono text-2xl text-center'>Gymwear</p>
          <p className='font-semibold font-mono text-md text-center mb-20'>For a healthy You</p>
        </div>
      </div>
    
    </div>
  )
}

export default Catalog