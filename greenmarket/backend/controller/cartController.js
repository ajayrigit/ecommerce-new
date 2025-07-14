import User from "../models/User.js"

export const cartController=async(req,res)=>{
    try{
    
        const{userId,cartItems}=req.body;
        await User.findByIdAndUpdate(userId,{cartItems});
        res.json({sucess:true,message:"cart updated"})

    }catch(error){
        console.log(error.message)
         res.json({sucess:false,message:"error cart"})

    }

    

}

