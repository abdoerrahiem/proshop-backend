import asyncHandler from 'express-async-handler'
import Order from '../models/Order.js'

// Create order
export const addOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('Item orderan tidak ditemukan.')
  } else {
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    res.status(201).json(order)
  }
})

// Get order
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order tidak ditemukan.')
  }
})

// Update order to paid
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    await order.save()
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order tidak ditemukan.')
  }
})

// Get current user's orders
export const getCurrentUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// Get orders
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', '_id name')
  res.json(orders)
})

// Update order to delivered
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    await order.save()
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order tidak ditemukan.')
  }
})
