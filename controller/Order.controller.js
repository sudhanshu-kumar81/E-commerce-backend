import Order from "../model/Order.model.js";

export const fetchOrdersByUser = async (req, res) => {
    const user  = req.query;
    const userId = user['user.id'];
    console.log("user is ",user);
    console.log("fetch order by user- req.query",req.query);
    try {
      const orders = await Order.find({ user: userId }).populate("user");

      res.status(200).json({
        success:true,
        message:"order fetched by user",
        orders:orders
      });
    } catch (err) {
      res.status(400).json({
        success:false,
        message:"error in order fetching by user",
       error:err.message
      });
    }
  };

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