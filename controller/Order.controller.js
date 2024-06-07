import Order from "../model/Order.model.js";
export const fetchAllOrders = async (req, res) => {
  console.log("req.query is ",req.query);
  let query = Order.find({});
  let totalOrdersQuery =Order.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalOrdersQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalOrdersQuery = totalProductsQuery.find({ brand: req.query.brand });
  }
  //TODO : How to get sort on discounted Price not on Actual price
  console.log("req.query._sort",req.query._sort)
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrdersQuery.count().exec();

  if (req.query._page && req.query._per_page) {
    const pageSize = req.query._per_page;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.populate("user").exec();
    res.status(200).json({
      success:true,
      message:"fetched product successfully",
      totalDocs:totalDocs,
      orders:docs
    });
  } catch (err) {
    res.status(400).json({
      success:false,
      message:"error in fetching order",
      error:err.message,
    });
  }
};
// export const fetchAllOrders = async (req, res) => {
//     const user  = req.query;
//     const userId = user['user.id'];
//     console.log("user is ",user);
//     console.log("fetch order by user- req.query",req.query);
//     try {
//       const orders = await Order.find({}).populate("user");

//       res.status(200).json({
//         success:true,
//         message:"order fetched by user",
//         orders:orders
//       });
//     } catch (err) {
//       res.status(400).json({
//         success:false,
//         message:"error in order fetching by user",
//        error:err.message
//       });
//     }
//   };

  export const createOrder = async (req, res) => {
    console.log("order in backend is ",req.body);
    const order = new Order(req.body);
    
    try {
      const doc = await order.save();
      res.status(201).json({
        success:true,
        message:"order created successfully ",
        order:doc
      });
    } catch (err) {
      res.status(400).json({
        success:false,
        message:"error in creating order ",
        error:err.message
      });
    }
  };

  export const deleteOrder = async (req, res) => {
      const { id } = req.params;
      try {
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json({
        success:true,
        message:"order deleted successfully",
        deletedIOrders:order
      });
    } catch (err) {
      res.status(400).json({
        success:false,
        message:"error in deleting order ",
        error:err.message
      });
    }
  };

  export const updateOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json({
        success:true,
        message:"order updated successfully",
        updatedOrders:order
      });
    } catch (err) {
      res.status(400).json({
        success:false,
        message:"error in updating order ",
        error:err.message
      });
    }
  };