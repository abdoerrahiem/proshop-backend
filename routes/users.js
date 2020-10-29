import express from 'express'
import {
  loginUser,
  getCurrentUser,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
} from '../controllers/users.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'

const router = express.Router()

router.route('/').post(registerUser).get(auth, admin, getUsers)
router.post('/login', loginUser)
router.route('/profile').get(auth, getCurrentUser).put(auth, updateUserProfile)
router
  .route('/:id')
  .delete(auth, admin, deleteUser)
  .get(auth, admin, getUser)
  .put(auth, admin, updateUser)

export default router
