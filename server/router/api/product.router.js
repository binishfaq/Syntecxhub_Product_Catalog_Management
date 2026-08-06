const express = require('express');
const Category = require('../../models/category.model')
const Product = require('../../models/product.model')
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin.auth");

router.get('/', async (req, res) => {
    try {
        let filter = {};
        const {search, category, limit=10, page = 1} = req.query;
            const skip =(Number(page -1)*Number(limit));
        if(search){
            filter.name ={$regex: search, $options: "i"}
        }
        if(category){
            filter.category =category;
        }
        const totalProducts = await Product.countDocuments(filter);
        const product = await Product.find(filter).populate("category").populate("createdBy", "username email").skip(skip).limit(Number(limit));
        if (product.length === 0) {
            return res.status(404).json({ success: false, msg: "No Products are Found" })
        }

        res.status(200).json({ success: true,totalProducts, currentPage: Number(page), totalPages: Math.ceil(totalProducts/limit), product })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, msg: "Server Error" })
    }
}); 

router.post('/', [auth, admin,
    check('name', "Name is Required").not().isEmpty(),
    check('description', "Description is Required").not().isEmpty(),
check('category', "Category is Required").not().isEmpty(),
check('price', "price must be positive number").isFloat({min:0}),
check('stock', "Stock must be 0 or greater").isInt({min: 0}),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, description, price, brand, stock, category } = req.body;
    try {
        const existingCategory = await Category.findById(category);
        if(!existingCategory){
            return res.status(404).json({
    success: false,
    msg: "Category not found"
  });
        }
        const product = await Product.findOne({name});
        if (product) {
            return res.status(400).json({ success: false, msg: "product  already exists" })
        };
        const newProduct = new Product({
            name, description,  price, brand, stock, category, createdBy: req.user.id
        });
        await newProduct.save();
        const savedProduct = await Product.findById(newProduct._id)
    .populate("category")
    .populate("createdBy", "username email");

        res.status(201).json({ success: true, msg: "Product Added Successfully", product: savedProduct })

    } catch (err) {
        console.error(err.message);
        if (err.name === "CastError") {
  return res.status(400).json({
    success: false,
    msg: "Invalid ID",
  });
}
        res.status(500).json({ success: false, msg: "Server Error" })
    }
});


router.get('/dashboardstats', async(req, res)=>{
    try{
        const stats = await Product.aggregate([
            {
                $group:{
                    _id:"$category",
                    totalProducts:{
                        $sum:1
                    },
                    totalStock:{
                        $sum: "$stock"
                    },
                    averagePrice:{
                        $avg: "$price"
                    }
                }
            }
        ]);
        res.status(200).json({
            success: true,
            stats
        });
    }catch(err){
        console.error(err.message);
        res.status(500).json({ success: false, msg: "Server Error" })
  
    }
})

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category")
    .populate("createdBy", "username email");;
        if (!product) {
            return res.status(404).json({ success: false, msg: "No products Found" })
        }
        res.status(200).json({ success: true, product })
    } catch (err) {
        console.error(err.message);
        if (err.name === "CastError") {
            return res.status(404).json({
                success: false,
                msg: "Category not found"
            });
        }
        res.status(500).json({ success: false, msg: "Server Error" });

    }
});

router.put('/:id', [auth, admin], async(req, res)=>{
    const { name, description,price, stock, brand, category } = req.body;
    try {
        
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, msg: "Product not found" })
        };
        if(category){

            const existingCategory = await Category.findById(category);
            if(!existingCategory){
                return res.status(404).json({
        success: false,
        msg: "Category not found"
      });
            }
            product.category = category;
        }

        if(name) product.name= name;
        if(description) product.description= description;
        if(price !== undefined) product.price= price;
        if(brand)product.brand= brand;
        if(stock !== undefined) product.stock= stock;
        
        await product.save();
        const savedProduct = await Product.findById(product._id)
    .populate("category")
    .populate("createdBy", "username email");
            res.status(200).json({ success: true, msg: "Product updated Successfully",product: savedProduct})
    } catch (err) {
        console.error(err.message);
        if (err.name === "CastError") {
            return res.status(404).json({
                success: false,
                msg: "Product not found"
            });
        }
        res.status(500).json({ success: false, msg: "Server Error" });
    }
})

router.delete('/:id', [auth, admin], async(req, res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, msg: "Product not Found" })
        }
            res.status(200).json({ success: true, msg: "Product deleted Successfully",product })


    } catch (err) {
        console.error(err.message);
        if (err.name === "CastError") {
            return res.status(404).json({
                success: false,
                msg: "Product not found"
            });
        }
        res.status(500).json({ success: false, msg: "Server Error" });
    }
})

module.exports = router;