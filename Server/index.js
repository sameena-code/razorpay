 const express= require("express");
 const Razorpay=require("razorpay");
 const cors=require("cors");
 const crypto=require("crypto");
 require("dotenv").config();
 const app=express();
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 app.use(cors());

 app.get("/",(req,res)=>{
    res.send("Hello world");
 })

 app.post('/order',async(req,res)=>{
    try{
        const razorpay=new Razorpay({

     key_id:process.env.RAZORPAY_KEY_ID, 
     key_secret:process.env.RAZORPAY_KEY_SECRET , 
          
        });
        if(!req.body){
            return res.status(400).send("Bad Request");
        }
        const options=req.body;
        const order =await razorpay.orders.create(options);
      if(!order){
        return res.status(400).send("Bad request")
      }
 res.json(order);
    }catch(error){
        console.log(error);
         res.status(500).send(error);
    }
 })
 app.post('/validate', async(req,res)=>{
   const {razorpay_order_id,razorpay_payment_id, razorpay_signature}=req.body; 
   const sha= crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET);
   sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
   if(digest!== razorpay_signature){
    return res.status(400).json({msg:"Transaction not legit"});
   }
   res.json({msg:"transaction is legit!",orderId:razorpay_order_id,paymentId:razorpay_pament});
   

 })

 app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
 })

 
