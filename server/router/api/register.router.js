const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {check,  validationResult } = require('express-validator');
const User = require('../../models/user.model');
require('dotenv').config();

router.get('/', (req, res)=>{
    res.json("user router")
})
router.post('/',[
    check('username', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password must be equal to 6 character').isLength({min: 6})
], async(req, res)=>{
    const {username, email, password}= req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ error: errors.array()})
    }
    try {    
        let user = await User.findOne({email});
        if(user){return res.status(400).json('User Already Exists')}
        user = new User({
        username, email, password
        });
        const Salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, Salt)
        await user.save();
        //token gen
        const payload = {
            user:{
               id:user.id,
               role: user.role
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:37000 }, (err, token) =>{
    if(err) throw err;
    res.json({token});
            })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }


})

module.exports = router;