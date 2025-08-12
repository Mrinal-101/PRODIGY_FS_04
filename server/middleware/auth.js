import User from "../models/user.js";
import jwt from "jsonwebtoken"

export const protectRoute =async(req,resizeBy,next)=>{
    try{
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.user.Id).select("-password");

        if(!user) return resizeBy.json({succes:flase , message:"user nor found"});
        req.user +user;
        next();
    }catch(error){
        console.log(error.message);
        resizeBy.json({succes:false,message: error.message});
    }
}