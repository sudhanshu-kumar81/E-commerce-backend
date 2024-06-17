import Order from "../model/Order.model.js";
import mongoose from "mongoose";
import Product from "../model/Product.model.js";
export const fetchOrderOfUser=async(req,res)=>{
  try{
    const {id}=req.params;
    const order=await Order.find({user:id});
    res.status(200).json({
      success:true,
      message:"fetched order of user successfully",
      userOrder:order,
    });

  }catch(err){
    res.status(400).json({
      success:false,
      message:"error in fetching user order",
      error:err.message,
    });
  }
}


export const fetchAllOrders = async (req, res) => {
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
  export const createOrder = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    const order = new Order(req.body);
    const productAllProductId = order.items.map(item => item.product.id);
    try {
      for (let item of order.items) {
        const updatedProduct = await Product.findByIdAndUpdate(item.product.id, { $inc: { stock: -item.quantity } }, { new: true });
      }
      const doc = await order.save();
      await session.commitTransaction();
      session.endSession();
      res.status(201).json({
        success:true,
        message:"order created successfully ",
        order:doc
      });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
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