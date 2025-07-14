import React from 'react'
import { useAppcontext } from '../context/Appcontext'
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets';
import Cart from '../components/Cart';


const ProductCate = () => {
    const{product}=useAppcontext();
    const {category}=useParams()
    const searchcategory=categories.find((item)=>item.path.toLowerCase()=== category)
    const filterproducts=product.filter((product)=>product.category.toLowerCase()=== category)

  return (
    <div className='mt-16'>
        {searchcategory  && (
            <div className='flex flex-col items-end w-max'>
                <p>{searchcategory.text.toUpperCase()}</p>
                <div className='w-16 h-0.5 bg-green rounded-full'></div>
            </div>
        )}
        {filterproducts.length > 0 ?(
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
                {filterproducts.map((product)=>(
                    <Cart  key={product._id} product={product}/>
                ))}

            </div>
        ): (
            <div className='flex items-center justify-center h-[60vh]'>
                <p className='text-2xl font-medium text-green'>NO products</p>
            </div>

        )
        }
    </div>
  )
}

export default ProductCate