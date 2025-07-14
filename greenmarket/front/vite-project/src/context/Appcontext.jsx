import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";


axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials=true;

export const Appcontext=createContext();

export const Appcontextprovider=({children})=>{

    const currency =import.meta.env.VITE_CURRENCY;

    const navigate=useNavigate();
    const [product,setProduct]=useState([])
    const[user,setUser]=useState(false);
    const[isseller,setSeller]=useState(false);
    const[showUserLogin,SetshowUserLogin]=useState(false);
    const[cartItems,setCartItems]=useState({});
    const[searchquery,SetSearchquery]=useState({})


    const fetchSeller= async()=>{
        try{
            const{data}= await axios.get('/api/seller/seller-auth')
            if(data.success){
                setSeller(true)
            }else{
                setSeller(false)
            }

        }catch{
            setSeller(false)

        }

    }

    //fetchuser auth
    const fetchUser= async()=>{
        try{
            const{data}= await axios.get('api/user/is-auth');
            if(data.success){
                setUser(data.user)
                setCartItems(data.user.cartItems)
            }

        }catch(error){
            setUser(null)
            

        }
    }


    

  
    
  
    const fetchproducts=async()=>{
        try{
            const {data}= await axios.get('/api/product/productList')
            if(data.sucess){
                setProduct(data.products)

            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)

        }
        
    }


    const addToCart=(itemId)=>{
        let cartdata= structuredClone(cartItems)
        if(cartdata[itemId]){
            cartdata[itemId]+=1
        }else{
            cartdata[itemId]=1;
        }
        setCartItems(cartdata);
        toast.success("added to cart")
    }

    const updateTOCart=(itemId,quantity)=>{
        let cartdata=structuredClone(cartItems);
        cartdata[itemId]=quantity;
       
        setCartItems(cartdata);
        toast.success("updated sucessfully")
    }



    const removeToCart=(itemId)=>{
        let cartdata=structuredClone(cartItems);
        if(cartdata[itemId]){
            cartdata[itemId]-=1
        }
        if(cartdata[itemId]===0){
            delete cartdata[itemId]
        }
        toast .success("removed")
        setCartItems(cartdata);
    }
    const getCartCount=()=>{
        let totalamount=0
        for(const item in cartItems){
            totalamount+=cartItems[item];

        }
        return totalamount;
    }

    const getCartAmount=()=>{
        let totalcount=0;
        for(const items in cartItems){
            let iteminfo=product.find((product)=> product._id === items);
            if(cartItems[items]>0){
                totalcount += iteminfo.offerPrice * cartItems[items] 
            }
            
        }
        return Math.floor(totalcount*100/100);
    }




    useEffect(()=>{
        fetchUser();
        fetchproducts();
    },[])

    useEffect(()=>{
        fetchSeller();
    },[])

    // update Database cart Items
    useEffect(() => {
        const updateCart = async () => {
            if (!user || !user._id) return;
            // make sure user is defined
            try {
                // Send user ID and cartItems to backend
                const { data } = await axios.post('/api/cart/update', {
                    userId: user._id,    // pass user id
                    cartItems           // pass cart items
                });
                console.log("Update cart response:", data);
                if (!data.success) {
                    toast.error(data.message);
                }
                } catch (error) {
                    toast.error(error.response?.data?.message || error.message);
                }
    };

  updateCart();
}, [cartItems, user]);

   
    


    const value={user,isseller,setSeller,navigate,showUserLogin,SetshowUserLogin,product,currency,addToCart,updateTOCart,cartItems,removeToCart,setUser,searchquery,SetSearchquery,getCartCount,getCartAmount,axios,fetchproducts,setCartItems};

    return <Appcontext.Provider value={value}>
        {children}
    </Appcontext.Provider>

}

export const useAppcontext=()=>{
    return useContext(Appcontext)
}
