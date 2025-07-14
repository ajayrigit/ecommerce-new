import React, { useEffect, useState } from 'react'
import { dummyOrders } from '../assets/assets';
import { useAppcontext } from '../context/Appcontext';
import axios from 'axios';

const Orders  = () => {
    const{currency,axios,user}=useAppcontext()

    const[ordes,SetOrder]=useState([]);
    const Fetch=async ()=>{
        try{
           const { data } = await axios.get(`/api/order/user?userId=${user._id}`);

            if(data.success){
                SetOrder(data.orders)
            }


        }catch(error){
            console.log(error.message)


        }
        
    }

    useEffect(()=>{
        if(user){
              Fetch();

        }
        
    },[user])
  return (
  <div className='mt-16 pb-16'>
    <div>
      <p className='flex flex-col items-end w-max mb-8'>My Orders</p>
      <div className='w-16 h-0.5 bg-green rounded-full'></div>
    </div>

    {ordes.length > 0 ? (
      ordes.map((orde, index) => (
        <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
          <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
            <span>Order ID: {orde._id}</span>
            <span>Payment: {orde.paymentType}</span>
            <span>Total Amount: {currency}{orde.amount}</span>
          </p>

          {orde.items.map((item, itemIndex) => (
            <div key={itemIndex}>
              <div className='flex items-center mb-4 md:mb-0'>
                <div className='bg-green/10 p-4 rounded-lg'>
                  <img src={item.product.image[0]} alt={item.product.name} className='w-16 h-16' />
                </div>
                <div className='ml-4'>
                  <h2>{item.product.name}</h2>
                  <p>Category: {item.product.category}</p>
                </div>
              </div>

              <div className='text-green text-lg font-medium'>
                <p>Quantity: {item.quantity || "1"}</p>
                <p>Status: {orde.status}</p>
                <p>Date: {new Date(orde.createdAt).toLocaleDateString()}</p>
              </div>

              <p className='text-primary text-lg font-medium'>
                Amount: {currency}{item.product.offerprice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))
    ) : (
      <p className="text-gray-500 mt-8">No orders found.</p>
    )}
  </div>
);
}

export default Orders 