const express= require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {check,  validationResult } = require('express-validator');
const User = require('../../models/user.model');
require('dotenv').config();

router.get('/',auth,  async (req, res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})
router.post('/', [
    check('email', 'Email is Required').exists(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6})
],
async (req, res)=>{
const {email, password} = req.body;
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({error: errors.array()})
}
try {
    let user = await User.findOne({email});
    if(!user){
return res.status(401).json({msg: 'Invalid Credentials'})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({msg: 'Invalid Credentials'})
    }
    const payload = {
        user:{
            id: user.id,
            role: user.role
        }
    }
    jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: 37000}, (err, token)=>{
        if(err) throw err;
        res.json({
  token,
  user: {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  },
});
    })
} catch (err) {
     console.error(err.message);
        res.status(500).send('Server Error')
}
})





module.exports = router;
