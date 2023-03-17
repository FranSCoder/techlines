import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const orderRoutes = express.Router();

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, paymentDetails, userInfo } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Su carrito está vacío.');
  } else {
    const order = new Order({
      orderItems,
      user: userInfo,
      username: userInfo.name,
      email: userInfo.email,
      shippingAddress,
      paymentMethod,
      paymentDetails,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

orderRoutes.route('/').post(protectRoute, createOrder);

export default orderRoutes;
