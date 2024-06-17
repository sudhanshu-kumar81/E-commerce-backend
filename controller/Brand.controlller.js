import Category from "../model/Category.model.js";
import Brand from "../model/Brand.model.js";
export const fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).exec();
    res.status(200).json({
      success:true,
      message:"successfully Brand acheived",
      brands:brands
    });
  } catch (err) {
    res.status(400).json({
      message:"failed to load brands",
      success:false,
      message:err.message
    });
  }
};

export const createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const doc = await brand.save();
    res.status(201).json({
      success:true,
      message:"category added",
      docs:doc
    });
  } catch (err) {
    res.status(400).json({
      success:false,
      message:"error in  adding brand",
      error:err.message
    });
  }
};


