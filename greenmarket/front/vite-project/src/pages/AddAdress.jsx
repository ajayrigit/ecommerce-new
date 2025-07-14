import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppcontext } from '../context/Appcontext'
import toast from 'react-hot-toast'


const  InputField=({type,placeholder,name,handleChange,address})=>(
    <input  className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500
     focus:border-primary transition'
     type={type} 
     placeholder={placeholder} 
     name={name} 
     onChange={handleChange} 
     value={address[name]}
     required/>
)

const AddAdress = () => {
    const{axios,user,navigate}=useAppcontext();
    const[address,SetAddress]=useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:'',
    })
    const handleChange=(e)=>{
        const{name,value}=e.target;

        SetAddress((prevAdress)=>({
            ...prevAdress,
            [name]:value,
        }))

    }

    const omsubmit=async(e)=>{
        e.preventDefault();
        try{
            const{data}=await axios.post('/api/address/addaddress',{address,userId: user._id,});
            if(data.success){
                toast.success(data.message)
                navigate('/cart')
            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)

        }
        
       
    }


  return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={omsubmit} className='space-y-3 mt-6 text-sm'>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField   handleChange={handleChange} address={address} name='firstName' type='text' placeholder="firstname" />
                        <InputField  handleChange={handleChange} address={address} name='lastName' type='text' placeholder="lastname" />
                    </div>
                    <InputField  handleChange={handleChange} address={address} name='email' type='email' placeholder="Email-adress" />
                    <InputField  handleChange={handleChange} address={address} name='street' type='text' placeholder="street" />
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField  handleChange={handleChange} address={address} name='city' type='text' placeholder="city" />
                        <InputField  handleChange={handleChange} address={address} name='state' type='text' placeholder="state" />

                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField  handleChange={handleChange} address={address} name='zipcode' type='number' placeholder="zip-code" />
                        <InputField  handleChange={handleChange} address={address} name='country' type='text' placeholder="country" />

                    </div>
                    <InputField  handleChange={handleChange} address={address} name='phone' type='number' placeholder="phone" />
                    <button className='w-full mt-6 bg-green text-black py-3 hover:bg-green-dull transition cursor-pointer uppercase'>
                        save adress
                    </button>
                    


                </form>

            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="add adress"/>
        </div>

    </div>
  )
}

export default AddAdress