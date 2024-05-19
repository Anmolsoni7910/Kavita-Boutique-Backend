import productService from '../services/product.service.js'

const createProduct = async(req,res) => {
    try {
        // console.log("req.body: ",req.body);
        const product = await productService.createProduct(req.body);  
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteProduct = async(req,res) => {
    try {
        const productId = req.params.id;  // /:id -> to yaha pe params.id lekhna hoga
        const message = await productService.deleteProduct(productId);
        return res.json({message});
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateProduct = async(req,res) => {
    try {
        const productId = req.params.id;
        const product = await productService.updateProduct(productId,req.body);
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getAllProducts = async(req,res) => {
    try {
        //req.query -> ?color=&size=
        const products = await productService.getAllProduct(req.query);
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const findProductById = async(req,res) => {
    try {
        const productId = req.params.id;
        const product = await productService.findProductById(productId);
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const findProductByCategory = async(req,res) => {
    try {
        const category = req.params.category;
        const products = await productService.findProductByCategory(category);
        return res.json(products);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const createMultipleProduct = async(req,res) => {
    try {
        // console.log("products[]:",req.body);
        await productService.createMultipleProduct(req.body);
        res.status(200).json({message: "Products Created Successfully ", success: true});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export default {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    findProductByCategory,
    createMultipleProduct
}