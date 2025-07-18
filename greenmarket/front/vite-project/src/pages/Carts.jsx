import { useEffect, useState } from "react"
import { useAppcontext } from "../context/Appcontext"
import { assets, dummyAddress } from "../assets/assets"
import axios from "axios"
import toast from "react-hot-toast"
import { data } from "react-router-dom"

const Carts = () => {
    const{cartItems,getCartCount,getCartAmount,removeToCart,product,currency,navigate,updateTOCart,axios,user,setCartItems}=useAppcontext()
    const [cartArray,setCartArray] = useState([])
    const [adress, setAddress] = useState([]);
    const [selectedAddress, setSelectedddress] = useState(null)
    const [showAddress, setShowAddress] = useState(false)
    const [paymentType, setPayment] = useState("COD")

    const getcart=()=>{
        let temp=[];
        for(const key in cartItems){
            const prod=product.find((item)=> item._id === key)
            prod.quantity=cartItems[key]
            temp.push(prod)
        }
        setCartArray(temp)
    }



    const getUserAddress = async () => {
        try {
            const { data } = await axios.get(`/api/address/getaddress?userId=${user._id}`);
            if (data.success) { 
                setAddress(data.addresses)
                if (data.addresses.length > 0) {
                    setSelectedddress(data.addresses[0]);
                }

            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    
   


    useEffect(()=>{
        if(user){
            getUserAddress();
        }

    },[user])





    useEffect(()=>{
        if(product.length >0  && cartItems){
            getcart();

        }
    },[product,cartItems])




    const placeorder=async()=>{
        try{
            if(!selectedAddress){
                return alert('please select an address')
            }
            if(paymentType === 'COD'){
                const{ data} = await axios.post('api/order/cod',{
                    userId: user._id,
                    items:cartArray.map(item =>({product:item._id ,quantity:item.quantity})),
                    address:selectedAddress._id
                })

                
            
                if(data.success){
                    toast.success(data.message)
                    setCartItems({})
                    navigate('/orders')
                }else{
                    alert("error found")
                }

            }else{
                const{ data} = await axios.post('api/order/stripe',{
                    userId: user._id,
                    items:cartArray.map(item =>({product:item._id ,quantity:item.quantity})),
                    address:selectedAddress._id
                })

                
            
                if(data.success){
                    window.location.replace(data.url)
                    
                }else{
                    alert("error found")
                }
                
                

            }



        }catch(error){
            toast.error(error.message)


        }



    }

    
    return product.length >0  && cartItems ? (
        <div className="flex flex-col md:flex-row  mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{getCartCount()}</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={()=>{navigate (`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.Weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select className='outline-none'>
                                            {Array(cartItems[product._id]> 9 ?
                                            cartItems[product._id] :9 

                                            ).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={()=>removeToCart(product._id)} className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon}alt="remove"  className="inline-block w-6 h-6"/>
                        </button>
                    </div>)
                )}

                <button onClick={()=>{navigate("/products")}}  className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <img className="group-hover:-translate-x- transition" src={assets.arrow_right_icon_colored} alt="colted icon" />
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`: "no adress found"}No address found</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-500 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                { adress.map(( adress,index)=> (
                                    <p onClick={() =>{setSelectedddress(adress); setShowAddress(false)}} className="text-gray-500 p-2 hover:bg-gray-100">
                                        {adress.street},{adress.city},{adress.state},{adress.country}
                                    
                                    </p>

                                ))} 
                                <p onClick={() => navigate("/add-adress")} className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select  onChange={e => setPayment(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{getCartAmount() * 2 / 100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{getCartAmount() + getCartAmount() * 2 / 100}</span>
                    </p>
                </div>

                <button onClick={placeorder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                    {paymentType === "COD" ? "Place Order" : "proceed to checkout"}
                </button>
            </div>
        </div>
    ) : null
}


export default Carts