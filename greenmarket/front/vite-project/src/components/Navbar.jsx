import React, { useContext, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import{assets} from "../assets/assets"
import { useAppcontext } from '../context/Appcontext'
import toast from 'react-hot-toast/headless'

const Navbar = () => {
     const [open, setOpen] = React.useState(false)
     const{user,setUser,SetshowUserLogin,navigate,searchquery,SetSearchquery,getCartCount,axios}=useAppcontext();

     const logout=async()=>{
        try{
            const {data}=axios.get('api/user/logout')
            if(data.sucess){
                toast.success(data.message)
                setUser(null);
                navigate("/")
        

            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)

        }

        setUser(null);
        navigate("/")
        

     }
    useEffect(()=>{
        if(searchquery.length > 0){
            navigate("/products")
        }
    },[searchquery])
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <Link to={"/"}>
                <img onClick={()=>setOpen(false)} className="h-9" src={assets.logo} alt="logo" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to={"/"}>Home</Link>
                <Link to={"/products"}>All products</Link>
                <Link to={"/contact"}>Contact</Link>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e)=> SetSearchquery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt='search' className='w-4 h-4'/>
                   
                </div>

                <div className="relative cursor-pointer">
                    <img onClick={()=>navigate("/cart")} src={assets.nav_cart_icon} alr="cart" className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>

                { !user ?( <button onClick={()=>SetshowUserLogin(true)} 
                className="cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">

                    Login
                </button>)

                :
                (
                    <div className='relative group'>
                        <img src={assets.profile_icon} alt='profile'className='w-10' />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                            <li onClick={()=> navigate("orders")} className='p-1.5 hover:bg-indigo/10 cursor-pointer'>my orders</li>
                            <li onClick={logout} className='p-1.5 hover:bg-indigo/10 cursor-pointer'>logout</li>
                        </ul>

                    </div>
                )}
            </div>
    <div className='flex items-center gap-6 sm:hidden'>


        <div className="relative cursor-pointer">
            <img onClick={()=>navigate("/cart")} src={assets.nav_cart_icon} alr="cart" className='w-6 opacity-80'/>
            <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
        </div>



        <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
            {/* Menu Icon SVG */}

    
            <img src={assets.menu_icon} alt='menu' />
        </button>



    
    </div>           


            {/* Mobile Menu */}
            { open && (

            
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
                <Link to="/products" onClick={()=>setOpen(false)}>products</Link>
                {user && 

                <Link to="/orders" onClick={()=>setOpen(false)}>My orders</Link>
                }
                <Link to="/contact" onClick={()=>setOpen(false)}>contact</Link>

                {!user ? (
                    <button onClick={()=>{
                        setOpen(false);
                        SetshowUserLogin(true)
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                    Login
                </button>

                ):(
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
                    logout
                </button>

                )}

              
            </div>
            )}

        </nav>



        

   
  )
}

export default Navbar