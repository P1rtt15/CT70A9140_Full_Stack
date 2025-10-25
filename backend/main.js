const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const {connectDB, disconnectDB}  = require('./config/db')
const port = process.env.PORT || 8000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/nutrients', require('./routes/nutrientRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received.')
  // Additional cleanup tasks go here, e.g., close database connection
  await disconnectDB()
  console.log('Closed out remaining connections') 
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT signal received.')
  // Additional cleanup tasks go here, e.g., close database connection
  await disconnectDB()    
  console.log('Closed out remaining connections') 
  process.exit(0)
})