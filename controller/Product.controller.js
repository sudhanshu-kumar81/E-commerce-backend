import Product from '../model/Product.model.js'

export const createProduct = async (req, res) => {
  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json({
      message:'document saved',
      success:true,
      doc:doc
    })
  } catch (err) {
    res.status(400).json({
      message:"error in saving data",
      success:false,
      error:err.message,
    });
  }
};

export const fetchAllProducts = async (req, res) => {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  // TODO : we have to try with multiple category and brands after change in front-end
  let query = Product.find({});
  let totalProductsQuery = Product.find({});
  // let query = Product.find({deleted:{$ne:true}});
  // let totalProductsQuery = Product.find({deleted:{$ne:true}});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  //TODO : How to get sort on discounted Price not on Actual price
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();

  if (req.query._page && req.query._per_page) {
    const pageSize = req.query._per_page;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    // res.set('X-Total-Count', totalDocs);
    res.status(200).json({
      success:true,
      message:"fetched product successfully",
      totalDocs:totalDocs,
      product:docs
    });
  } catch (err) {
    res.status(400).json({
      success:false,
      message:"error in fetching product",
      error:err.message,
    });
  }
};

export const fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json({
      success:true,
      product:product
    });
  } catch (err) {
    res.status(400).json({
      success:false,
      error:err.message
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {new:true});
    res.status(200).json({
      success:true,
      message:"updated successfully",
      product:product
    });
  } catch (err) {
    res.status(400).json({
      success:"false",
      message:"error in updating",
      error:err.message
    });
  }
};