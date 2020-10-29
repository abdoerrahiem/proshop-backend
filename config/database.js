import mongoose from 'mongoose'

const database = async () => {
  try {
    const {
      connection: { host },
    } = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log(`Database MongoDB terhubung ke ${host}`.toUpperCase().bgGreen)
  } catch (error) {
    console.error(`Error: ${error.message}`.bgRed)
    process.exit(1)
  }
}

export default database
