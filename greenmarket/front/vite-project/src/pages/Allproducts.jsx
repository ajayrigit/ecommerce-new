import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../context/Appcontext'
import Cart from '../components/Cart';

const Allproducts = () => {
    const{product,searchquery}=useAppcontext();
    useEffect(()=>{
         if(searchquery.length > 0){
        SetFlter(product.filter(
            product =>product.name.toLowerCase().includes(searchquery.toLowerCase())

        ))}else{
            SetFlter(product)
        }

    },[product,searchquery])   
    const[flter,SetFlter]=useState([])
  return (
    <div className='mt-16 flex flex-col'>
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl font-medium uppercase'>All products</p>
            <div className='w-16 h-0.5 bg-green rounded-full'>
                
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {flter.filter((product)=> product.inStock).map((product,index)=>(
                    <Cart  key={index} product={product}/>
                ))}

            </div>
        </div>
    </div>
  )
}

export default Allproducts