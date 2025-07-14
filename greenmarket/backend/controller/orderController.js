import Order from "../models/order.js";
import Product from "../models/Product.js";
import Stripe from "stripe";
import User from "../models/User.js";

// place Order Cod:/api/order/cod
export const placeOrder = async(req,res)=>{
    try{
         const{userId,items,address} = req.body;
         if(!address || items.length === 0){
            return res.json({success:false,message:"error found"})

         }
         // calculate amount using items
         let amount =await items.reduce(async(acc,item)=>{
            const product= await Product.findById(item.product);
            return (await acc)+ product.offerprice * item.quantity;
         },0)

        //add tax
        amount+= Math.floor(amount * 0.02);
        await Order.create({userId,items,address,amount,paymentType:"COD"});
        res.json({success:true,message:"order paeced sucessfully"})

    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }

   

}



// place Order Online:/api/order/stripe
export const placeOnline = async(req,res)=>{
    try{
         const{userId,items,address} = req.body;
        const{origin}=req.headers;


         if(!address || items.length === 0){
            return res.json({success:false,message:"error found"})

        }
        let productData=[];



         // calculate amount using items
         let amount =await items.reduce(async(acc,item)=>{
            const product= await Product.findById(item.product);
            productData.push({
                name:product.name,
                price:product.offerprice,
                quantity:item.quantity,
            });
            return (await acc)+ product.offerprice * item.quantity;
         },0)

        //add tax
        amount+= Math.floor(amount * 0.02);
        const order=await Order.create({userId,items,address,amount,paymentType:"online"});
        //stripe initialize
        const stripeInstance=new Stripe(process.env.STRIPE_SECRET_KEY);
        // stripe line items

        const line_items=productData.map((item)=>{
            return{
                price_data:{
                    currency:'usd',
                    product_data:{
                        name: item.name,
                    },
                    unit_amount: Math.floor(item.price + item.price *0.02)*100

                },
                quantity:item.quantity
            }
        })

        //create session

        const session=await stripeInstance.checkout.sessions.create({
            line_items,
            mode:"payment",
            success_url:`${origin}/loader?next=orders`,
            cancel_url:`${origin}/cart`,
            metadata:{
                orderId:order._id.toString(),
                userId,
            }
            
        })




        return res.json({success:true, url:session.url})

    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }

   

}



// webhook to verify payment Action :/stripe

export const stripeWebhooks= async(req,res)=>{
    const stripeInstance=new Stripe(process.env.STRIPE_SECRET_KEY);

    const sig=req.headers['stripe-signature'];
    let event;

    try{
        event= stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );

    }catch(error){
        res.status(400).send(`webhook Error:${error.message}`)

    }

    // handle the event

    switch (event.type) {
        case 'payment_intent.succeeded':{
            const payment_intent= event.data.object;
            const payment_IntentId= payment_intent.id;

            // getting session method
            const session= await stripeInstance.checkout.sessions.list({
                payment_intent:payment_IntentId
            });

            const{orderId,userId}=session.data[0].metadata;
            //mark payment as paid

            await Order.findByIdAndUpdate(orderId,{isPaid:true})
            //clear user cart
            await User.findByIdAndUpdate(userId,{cartItems:{}})
            break;
        }
        case 'payment_intent.failed':{
            const payment_intent= event.data.object;
            const payment_IntentId= payment_intent.id;

            // getting session method
            const session= await stripeInstance.checkout.sessions.list({
                payment_intent:payment_IntentId
            });

            const{orderId}=session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;

        }
            
           
    
        default:
            console.error(`unhandled evenet type ${event.type}`)
            break;
            
    }
    res.json({received:true})


}






//get all orders userid :/api/oredr/user

export const getUserOrders= async(req,res)=>{
    try{
        const{userId}=req.query;
        const orders= await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]

        }).populate("items.product address").sort({createdAt:-1});
        res.json({success:true,orders})

    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}


//get all oredrs seller :/api/order/seller

export const getAllOrders= async(req,res)=>{
    try{
       
        const orders= await Order.find({
           
            $or:[{paymentType:"COD"},{isPaid:true}]

        }).populate("items.product address").sort({createdAt:-1});
        res.json({success:true,orders})

    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}







