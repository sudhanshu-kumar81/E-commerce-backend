import Category from "../model/Category.model.js";

export const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json({
      success:true,
      message:"successfully category acheived",
      category:categories
    });
  } catch (err) {
    res.status(400).json({
      message:"failed to load category",
      success:false,
      message:err.message
    });
  }
};

export const createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const doc = await category.save();
    res.status(201).json({
      success:true,
      message:"category added",
      docs:doc
    });
  } catch (err) {
    res.status(400).json({
      success:false,
      message:"error in  adding category",
      error:err.message
    });
  }
};


