const mongoose = require('mongoose');
require('dotenv').config();
const DBconnect = async ()=>{
    try {
    const conn = await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("DataBase is connected..........!!!")
    
} catch (error) {
    console.error(error.message)
    console.log(error)
}

}

module.exports = DBconnect;