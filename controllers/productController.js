const Product = require("../models/Product");

const createProduct = (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
   return res.status(400).json({ msg: "Missing Data" });
  }

  Product.create({ name, price }).then((product) => {
    res.status(201).json({ msg: "Product Created", data: product });
  });
};

const getAllProducts = async (req, res) => {
  try {
    const limit = req.query.limit || 10;

    const product = await Product.find().limit(limit);
    res.status(200).json({ msg: "Products fetched", data: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = { createProduct, getAllProducts };
