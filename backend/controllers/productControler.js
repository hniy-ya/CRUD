import { Product } from "../model/product.model.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        console.log("fetched products", products);

        res.status(200).json({ success: true, data: products });
        return products;
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        console.log("Error getting products");
    }
};
export const createProducts = async (req, res) => {
    const { name, price, quantity, image } = req.body;

    if (!name || !price || !quantity || !image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const newProduct = new Product({
            name,
            price,
            quantity,

            image,
        });

        await newProduct.save();
        console.log(newProduct);

        res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
        console.log("Error in createProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        console.log(" get one product" + product);
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.log("Error in getProduct function");
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateProducts = async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, image } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, quantity, image },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updateProducts) return res.status(404).json({ success: false, message: "product not found" });

        // console.log("new products added"+newProduct);
        res.status(200).json({ success: true, data: updatedProduct[0] });
    } catch (error) {
        console.log("Error in updateProducts function");
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const deleteProducts = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({ success: true, data: deletedProduct[0] });
    } catch (error) {
        console.log("Error in deleteProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const findProducts = async (req, res) => {
    const { name } = req.params;
    try {
        const products = await Product.find({
            name: { $regex: name, $options: "i" },
        });
        if (!products) {
            return res.status(404).json({
                success: false,
                message: "Product not foundd",
            });
        }

        res.status(200).json({ success: true, data: products[0] });
    } catch (error) {
        console.log("Error in findProduct function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const posData = async (req, res) => {
    const { customerName, productName, price, quantity, totalAmount } = req.body;

    if (!customerName || !productName || !price || !quantity || !totalAmount) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const newSale = new Sales({
            customerName,
            productName,
            price,
            quantity,
            totalAmount,
        });

        await newSale.save();
        console.log(newSale);
        res.status(201).json({ success: true, data: newSale[0] });
    } catch (error) {
        console.log("Error in POS function", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
