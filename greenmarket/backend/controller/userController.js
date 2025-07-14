import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const register =async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:"missing details"})
        }

        const existing= await User.findOne({email})

        if(existing){
            return res.json({success:false,message:"already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const user=await User.create({name,email,password:hashedPassword})

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"15d"});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",

            sameSite:process.env.NODE_ENV === "production" ? "none":'strict',
            maxAge:15 * 24 * 60 * 60 * 1000,

        })
        return res.json({success:true,user:{email:user.email,name:user.name,}})


    }catch(error){
        res.json({success:false,message:error.message})

    }

}

// login :/api/user/login 
export const login=async(req,res)=>{
    try{

        const {email,password}=req.body;
        if(!email || !password){
            res.json({success:false,message:"missing user name"})
        }
        const user= await User.findOne({email})
        if (!user) {


            return res.json({success:false,message:"no user logined"})


            
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){

            return res.json({success:false,message:"pasword no match"})

        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"15d"});
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",

            sameSite:process.env.NODE_ENV === "production" ? "none":'strict',
            maxAge:15 * 24 * 60 * 60 * 1000,

        })
        return res.json({success:true,user:{email:user.email,name:user.name,}})





    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}    

//check auth:/api/user/is auth
export const isAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
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


