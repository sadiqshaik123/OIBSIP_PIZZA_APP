const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");
const Order = require("../models/orderModel");

const razorpay = new Razorpay({
  key_id: "",
  key_secret: "",
});

router.post("/placeorder", async (req, res) => {
  const { subTotal, currentUser, cartItems } = req.body;

  try {
    const options = {
      amount: subTotal * 100, // amount in paise
      currency: "INR",
      receipt: uuidv4(),
      payment_capture: 1, // Auto capture payment
    };
    const order = await razorpay.orders.create(options);
    
    if (order) {
      // res.status(200).json({
      //   orderId: order.id,
      //   key: razorpay.key_id,
      //   amount: order.amount,
      //   currency: order.currency,
      //   status: "Payment Success",
      //   message: "Order placed successfully"
      // });
      
      const neworder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subTotal,
        transactionId: order.id,
      });
    
      await neworder.save();
      res.send('Order Placed Successfully')
    } else {
      res.status(400).json({
        message: "Payment Failed",
        error: error.stack,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.stack,
    });
  }
});


router.post('/getuserorders', async(req,res)=>{
  const {userid}= req.body
  try {
    const orders = await Order.find({userid:userid})
    res.send(orders)
    
  } catch (error) {
    return res.status(400).json({message:'Something went wrong'});
    
  }
});

router.get("/alluserorder", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wront",
      error: error.stack,
    });
  }
});
router.post("/deliverorder", async (req, res) => {
  const orderid = req.body.orderid;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    await order.save();
    res.status(200).send("Order deliverd success");
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      error: error.stack,
    });
  }
});

module.exports = router;