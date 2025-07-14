import Address from "../models/Address.js";


export const adressController= async( req,res)=>{

    try{
        const{address,userId}=req.body;
        await Address.create({...address,userId})
        res.json({success:true,message:"adress updated"})

    }catch(error){
        console.log(error.message)
         res.json({success:false,message:error.message})



    }

}

export const getAddress= async(req,res)=>{
    try{
        const{userId}=req.query;
         const addresses=await Address.find({userId})
        res.json({success:true,addresses})
    }catch(error){
        onsole.log(error.message)
         res.json({success:false,message:error.message})


    }

}