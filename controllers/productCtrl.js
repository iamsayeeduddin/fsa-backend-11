import { ProductModel } from "../models/productModel.js";

const getAllProducts = async (req, res) => {
  try {
    /// SELECT * FROM "PRODUCTS";
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const addProduct = async (req, res) => {
  try {
    const data = req.body;
    data.inStock = !data.stockQty ? false : true;
    const product = new ProductModel(data);
    await product.save();
    res.status(201).json({ message: "Product Added Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

export { getAllProducts, addProduct };
