import express from 'express'
import {
  addOrder,
  getCurrentUserOrders,
  getOrder,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/orders.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router = express.Router()

router.route('/').post(auth, addOrder).get(auth, admin, getOrders)
router.route('/myorders').get(auth, getCurrentUserOrders)
router.route('/:id').get(auth, getOrder)
router.route('/:id/pay').put(auth, updateOrderToPaid)
router.route('/:id/deliver').put(auth, admin, updateOrderToDelivered)

export default router
