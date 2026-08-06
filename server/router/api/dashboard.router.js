const express = require("express");
const router = express.Router();

const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const User = require("../../models/user.model");

router.get("/dashboardstats", async (req, res) => {
  try {
    const products = await Product.countDocuments();
    const categories = await Category.countDocuments();
    const users = await User.countDocuments();

    const stockResult = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" }
        }
      }
    ]);

    res.json({
      success: true,
      products,
      categories,
      users,
      stock: stockResult[0]?.totalStock || 0
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      msg: "Server Error"
    });
  }
});

module.exports = router;