import { ProductModel } from "../models/productModel.js";

// PAGINATION
// PAGE, PAGE SIZE (LIMIT), TOTAL RECORDS
// 100, 10, 10
// 105, 10, 11
// records/pageSize =
// 100, 10, 11 -> 3
// (page - 1) * pageSize = SKIP VALUE

const getAllProducts = async (req, res) => {
  try {
    /// SELECT * FROM "PRODUCTS";
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};

const getPaginatedProducts = async (req, res) => {
  try {
    const page = +req.params.page;
    const pageSize = +req.params.pageSize;
    const skip = (page - 1) * pageSize;
    const products = await ProductModel.find().skip(skip).limit(pageSize);
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

const updateProduct = async (req, res) => {
  try {
    const data = req.body;
    const productId = req.params.id;
    const product = await ProductModel.findByIdAndUpdate({ _id: productId }, data, { new: true });
    let resp = { success: true, message: "Prduct updated Successfully!", data: product };
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await ProductModel.findByIdAndDelete({ _id: productId });
    let resp = { success: true, message: "Prduct deleted Successfully!" };
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

export { getAllProducts, addProduct, updateProduct, deleteProduct, getPaginatedProducts };
