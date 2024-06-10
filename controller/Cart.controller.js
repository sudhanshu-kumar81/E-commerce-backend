import Cart from "../model/Cart.model.js";
export const fetchCartByUser = async (req, res) => {
  const id = req.userId;
  console.log("fetchcartByUser id as user",id);
  try {
    const cartItems = await Cart.find({ user:id}).populate('product').populate('user');
     console.log("data from fetchcartBy user",cartItems)
    res.status(200).json({
        success:true,
        message:"cart Item fetched",
        cartItems:cartItems
    });
  } catch (err) {
    res.status(400).json({
        success:false,
        error:err.message,
        message:"error in fetching cart items of user"
    });
  }
};

export const addToCart = async (req, res) => {
    console.log("req.body in addTocart  is ",req.body);
  const cart = new Cart(req.body);
  console.log("cart is in addTocart backend ",cart);
  try {
    const doc = await cart.save();
    const result =  await (await doc.populate("product")).populate("user")
    res.status(201).json({
        success:true,
        message:'add to cart successfully',
        cartDetails:result 

    });
  } catch (err) {
    res.status(400).json({
        success:false,
        message:"error in adding Item to cart",
        error:err.message
    });
  }
};

export const deleteFromCart = async (req, res) => {
    const { id } = req.params;
    console.log("id in backend for delete item from cart",id);
    try {
    const doc = await Cart.findByIdAndDelete(id);
    console.log("deletedItem is ",doc);
    res.status(200).json({
        success:true,
        message:"item deleted from cart",
        deletedItem:doc
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  console.log("id in update cart in backend is ",id);
  console.log("req.body in update cart in backend is ",req.body);

  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('product').populate('user');
    res.status(200).json({
        success:true,
        message:"cart Item updated",
        updatedItem:cart
    });
  } catch (err) {
    res.status(400).json({
        success:false,
        message:"failed in updating cart Item",
        error:err.message
    });
  }
};