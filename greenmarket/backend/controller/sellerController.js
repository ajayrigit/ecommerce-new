import jwt from 'jsonwebtoken'

export const sellerLogin=async(req,res)=>{
    try{
        const{email,password} =req.body;
        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD){
            const token= jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'15d'});

            res.cookie('sellerToken',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",

                sameSite:process.env.NODE_ENV === "production" ? "none":'strict',
                 maxAge:15* 24 * 60 * 60 * 1000,

            });
            return res.json({ success: true, message: "login" });
        }else{
            return res.status(401).json({ success: false, message: "invalid credentials" });
        }


    }catch(error){
        console.log("erroe mesage")
        res.json({success:false,message:error.message});

    }
   
}

export const isSeller = async (req, res) => {
  try {
   
    return res.json({ success: true});
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const sellerLogout=async(req,res)=>{
    try{
        res.clearCookie('sellerToken',{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? "none":'strict',
        });
        return res.json({success:true,message:"logout"})
    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}