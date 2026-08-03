const express = require('express');
const Category = require('../../models/category.model')
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin.auth");

router.get('/', async (req, res) => {
    try {
        const category = await Category.find();
        if (category.length === 0) {
            return res.status(404).json({ success: false, msg: "No Categories Found" })
        }
        res.status(200).json({ success: true, category })
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, msg: "Server Error" })
    }
});

router.post('/', [auth, admin,
    check('name', "Name is Required").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, description } = req.body;
    try {
        const category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ success: false, msg: "Category  already exists" })
        };
        const newCategory = new Category({
            name, description,
        });
        await newCategory.save();

        res.status(201).json({ success: true, msg: "Category Added Successfully", category: newCategory })

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, msg: "Server Error" })
    }
});


router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, msg: "No Categories Found" })
        }
        res.status(200).json({ success: true, category })
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
    const { name, description } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, msg: " Category not Found" })
        }

        if(name) category.name= name;
        if(description) category.description= description;
        
        await category.save();
            res.status(200).json({ success: true, msg: "Category updated Successfully",category })


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
})

router.delete('/:id', [auth, admin], async(req, res)=>{
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, msg: " Category not Found" })
        }
            res.status(200).json({ success: true, msg: "Category deleted Successfully",category })


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
})

module.exports = router;