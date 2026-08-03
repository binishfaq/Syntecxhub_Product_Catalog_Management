const express = require('express');

const admin = (req, res, next)=>{
    if(req.user.role !== 'admin'){
        return res.status(403).json({success: false, msg:"Only admin can Access: Access Denied"})
 
    }
    next();

}
module.exports = admin;