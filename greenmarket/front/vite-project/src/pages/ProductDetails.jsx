import { useEffect, useState } from "react";
import { useAppcontext } from "../context/Appcontext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCate from "./ProductCate";
import Cart from "../components/Cart";

const ProductDetails = () => {
    const{product,navigate,currency,addToCart}=useAppcontext();
    const{id}=useParams();
    const pro=product.find((item)=> item._id === id);


    useEffect(()=>{
        setThumbnail(pro?.image[0] ? pro.image[0]:null)



    },[pro])

    useEffect(()=>{
        if(product.length >0 ){
            let productCopy=product.slice();
            productCopy=productCopy.filter((item)=>pro.category === item.category)
            setRelated(productCopy.slice(0,5))
        }
    },[product])

    

    const [thumbnail, setThumbnail] =useState(null);
    const[related,setRelated]=useState([]);

    return pro && (
        <div className="mt-12">
            <p>
                <Link to={"/"}>Home</Link> /
                <Link to={"/products"}> Products</Link> /
                <Link to={`/products/${pro.category.toLowerCase()}`}> {pro.category}</Link> /
                <span className="text-indigo-500"> {pro.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {pro.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{pro.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            
                                <img src={i< 4 ?assets.star_icon : assets.star_dull_icon}alt=""  className="md:w-4 w-3.5"/>
                           
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{pro.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{pro.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {pro.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button  onClick={() => addToCart(pro._id)}  className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={() => {addToCart(pro._id);navigate("/cart")} } className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>``
                    </div>
                </div>
            </div>
            {/*related products */}
            <div className="flex flex-col items-center mt-20">
                <div className="flex flex-col items-center w-max">

                    <p className="text-3xl font-medium">Related Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>

                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 dap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
                    {related.filter((product)=> product.inStock).map((product,index)=>(

                        <Cart key={index} product={product} />


                    ))}
                </div>
                <button onClick={()=>{navigate('/products');scrollTo(0,0)}} className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-green/10 transition">see more</button>

            

            </div>
        </div>
    );
};

export default ProductDetails;

