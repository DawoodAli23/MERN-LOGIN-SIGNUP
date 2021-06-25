const express = require('express');
const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const saltRounds = 10;
const router=express.Router();
require('dotenv/config');


router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email}).lean();
    if(!user){
        return res.json({status:'error',error:'INVALID USERNAME/PASSWORD'})
    }else{    
        if(await bcrypt.compare(password,user.password)){
            const token=await jwt.sign({
                id:user._id,
                username:user.username
            },process.env.JWT_SECRET)
            res.json({status:'ok',data:token})
        }else{
            return res.json({status:'error',error:'INVALID USERNAME/PASSWORD'})
        }
    }
    res.json(user);
})

router.post('/signup',async(req,res)=>{
    // console.log(hash);
    
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:await bcrypt.hash(req.body.password, saltRounds)
    })
    const result=User.findOne({email:req.body.email},(err,docs)=>{
        // console.log(docs)
        if(docs){
            res.status(409).json("User already exists")
        }else{
            user.save()
            .then(
                data=>{
                console.log("second called")
                res.status(200).json(data)
            }).catch(
                err=>{
                    console.log("error");
                    res.status(409).json("User already exists")
                }
            )
        }
    });
});

router.get("/authenticate",async(req,res)=>{
    const jsonToken = req.get('token');
    
    // console.log(jsonToken)
    await jwt.verify(jsonToken,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(409).json(err);
        }
        console.log(decode)
        return res.status(200).json(decode);
    });
    
    // return res.status(200).json({status:'success'})
});

module.exports=router;