import jwt from 'jsonwebtoken'

const authSeller= async(req,res,next)=>{
    const{sellerToken}=req.cookies;
    if(! sellerToken){
         return res.json({ success: false, message: "User not found" });
    }

    try{
         const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
            if (decoded.email === process.env.SELLER_EMAIL) {
               // <-- attach userId here
              next();
            } else {
              return res.status(401).json({ success: false, message: "Not authorized" });
            }

    }catch(error){
         return res.json({ success: false, message: "User not found" });
    }

    


    
}

export default authSeller;