import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import 'colors'
import database from './config/database.js'
import { notFoundRoute, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/products.js'
import userRoutes from './routes/users.js'
import orderRoutes from './routes/orders.js'
import uploadRoutes from './routes/uploads.js'

dotenv.config()

database()

const app = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => res.send('API terhubung.'))

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFoundRoute)
app.use(errorHandler)

app.listen(
  process.env.PORT,
  console.log(
    `Server terhubung ke port ${process.env.PORT} dalam mode ${process.env.NODE_ENV}.`.toUpperCase()
      .bgGreen
  )
)
