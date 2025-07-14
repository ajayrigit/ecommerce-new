import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Toaster from 'react-hot-toast'
import Footer from './components/Footer'
import { useAppcontext } from './context/Appcontext'
import Login from './components/Login'
import Allproducts from './pages/Allproducts'
import ProductCate from './pages/ProductCate'
import ProductDetails from './pages/ProductDetails'
import Carts from './pages/Carts'
import AddAdress from './pages/AddAdress'

import Orders from './pages/Orders'
import Seller from './components/Seller.jsx/Seller'
import SellerLayout from './pages/seller/SellerLayout'
import Addproduct from './pages/seller/Addproduct'
import ProductList from './pages/seller/ProductList'
import Orderss from './pages/seller/Orderss'
import Loading from './components/Loading'
const App = () => {
  const issellerpath=useLocation().pathname.includes("seller");
  const {showUserLogin,isseller}=useAppcontext();
  return (
    <div>

      { issellerpath ? null : <Navbar />}
      {showUserLogin ? <Login /> :null }

      <Toaster />
      <div className={`${issellerpath ? "" :"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/'element={<Home />} />
          <Route path='/products'element={<Allproducts />} />
          <Route path='/products/:category' element={<ProductCate/>} />
          <Route path='/products/:category/:id' element={<ProductDetails/>} />
          <Route path='/cart' element={<Carts />} />
          <Route path='/add-adress' element={<AddAdress />} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/loader' element={<Loading/>} />
          <Route path='/seller' element={isseller ? <SellerLayout/> : <Seller/>}>
          <Route index element={isseller ? <Addproduct/> : null} />
          <Route path='productList' element={<ProductList />} />
          <Route path='orders' element={<Orderss />} />
          </Route>

          

        </Routes>
      </div>
     {!issellerpath && <Footer /> }
    </div>
    
  )
}



export default App

