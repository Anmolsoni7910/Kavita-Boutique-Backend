import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
// import { uploadOnCloudinary } from '../utils/cloudinary.js';

const createProduct = async(reqData) => {
    let topLevel = await Category.findOne({name: reqData.topLevelCategory});

    if(!topLevel){
        const topLevelCategory = new Category({
            name: reqData.topLevelCategory,
            level: 1,
        });

        topLevel = await topLevelCategory.save();
    }

    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id
    });

    if(!secondLevel){
        const secondLevelCategory = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        });

        secondLevel = await secondLevelCategory.save();
    }

    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id
    });

    if(!thirdLevel){
        const thirdLevelCategory = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        });

        thirdLevel = await thirdLevelCategory.save();
    }

    // const imageLocalPath = reqFile?.path;
    // if(!imageLocalPath){
    //   throw new Error("product Image is required!!!");
    // }

    // const imageURL = await uploadOnCloudinary(imageLocalPath);
    // if(!imageURL){
    //   throw new Error("error while uploading a file in cloudinary");
    // }
    
    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountPersent: reqData.discountPersent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        sizes: reqData.size,
        quantity: reqData.quantity,
        category: thirdLevel._id,
    });

    return await product.save();
}

const createMultipleProduct = async(products) => {
    // console.log(products);
    for(let product of products){
        await createProduct(product);
    }
}

const findProductById = async(productId) => {
    const product = await Product.findById(productId).populate("category").exec();

    if(!product){
        throw new Error("Product not found with id: ",productId);
    }

    return product;
}

const deleteProduct = async(productId) => {
    try {
        const product = await findProductById(productId);
        if(!product){
            throw new Error("Product not found with id: ",productId);
        }
        
        await Product.findByIdAndDelete(productId);

        return "Product deleted successfully.";
    } catch (error) {
        console.log("error deleteProduct",error.message);
        throw new Error(error.message);
    }
}

const updateProduct = async(productId, reqData) => {
    return await Product.findByIdAndUpdate(productId,reqData);
}

const getAllProduct = async(reqQuery) => {
    let {
        category,
        color,
        sizes,
        minPrice,
        maxPrice,
        minDiscount,
        sort,
        stock,
        pageNumber,
        pageSize,
      } = reqQuery;
      (pageSize = pageSize || 10), (pageNumber = pageNumber || 1);
      let query = Product.find().populate("category");
    
    
      if (category) {
        const existCategory = await Category.findOne({ name: category });
        if (existCategory){
          query = query.where("category").equals(existCategory._id);
        }
        else{
          return { content: [], currentPage: 1, totalPages:1 };
        } 
      }
    
      if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        query = query.where("color").regex(colorRegex);
        // query = query.where("color").in([...colorSet]);
      }
    
      if (sizes) {
        const sizesSet = new Set(sizes);
        
        query = query.where("sizes.name").in([...sizesSet]);
      }
    
      if (minPrice && maxPrice) {
        query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
      }
    
      if (minDiscount) {
        query = query.where("discountPersent").gte(minDiscount);
      }
    
      if (stock) {
        if (stock === "in_stock") {
          query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
          query = query.where("quantity").lte(0);
        }
      }
    
      if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ discountedPrice: sortDirection });
      }
    
      // Apply pagination
      const totalProducts = await Product.countDocuments(query);
    
      const skip = (pageNumber - 1) * pageSize;
    
      query = query.skip(skip).limit(pageSize);
    
      const products = await query.exec();
    
      const totalPages = Math.ceil(totalProducts / pageSize);
    
    
      return { content: products, currentPage: pageNumber, totalPages:totalPages };
}

export default {
    createProduct,
    findProductById,
    deleteProduct,
    updateProduct,
    createMultipleProduct,
    getAllProduct
}