const express = require('express');
const DBconnect = require('./config/db');
const cors = require('cors');
const app =  express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
DBconnect();

app.use('/api/register', require('./router/api/register.router'));
app.use('/api/login', require('./router/api/login.router'));
app.use('/api/category', require('./router/api/category.router'));
app.use('/api/products', require('./router/api/product.router'));
app.use('/api/dashboard', require('./router/api/dashboard.router'));

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})