import React from 'react'
import Cart from './Cart'
import { useAppcontext } from '../context/Appcontext'

const BestSeller = () => {
  const{product}=useAppcontext();
  return (
    <div className='mt-16'>

        <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">

          {product.filter((product)=> product.inStock).slice(0,5).map((product,index)=>(
            <Cart key={index} product={product}/>

          ))}

        
        </div>
        
    </div>
  )
}


export default BestSeller
