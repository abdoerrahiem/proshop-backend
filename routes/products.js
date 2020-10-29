import express from 'express'
import {
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/products.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router = express.Router()

router.route('/').get(getProducts).post(auth, admin, createProduct)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProduct)
  .delete(auth, admin, deleteProduct)
  .put(auth, admin, updateProduct)
router.route('/:id/reviews').post(auth, createProductReview)

export default router
