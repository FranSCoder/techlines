import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import { admin, protectRoute } from '../middleware/authMiddleware.js';

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

const getOrders = async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
};

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Pedido no encontrado.');
  }
});

const setDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('El pedido no pudo ser actualizado.');
  }
});

orderRoutes.route('/').post(protectRoute, createOrder);
orderRoutes.route('/:id').delete(protectRoute, admin, deleteOrder);
orderRoutes.route('/:id').put(protectRoute, admin, setDelivered);
orderRoutes.route('/').get(protectRoute, admin, getOrders);

export default orderRoutes;
