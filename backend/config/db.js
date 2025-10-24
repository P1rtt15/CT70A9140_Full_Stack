const mongoose = require('mongoose')

let conn

const connectDB = async () => {
    try {
        conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const disconnectDB = async (delayMs = 1000) => {
    try {
        console.log(`Disconnecting MongoDB: ${conn.connection.host}`)
        conn.connection.close();
        // Little delay to make sure the connection is closed before moving on
        await new Promise(resolve => setTimeout(resolve, delayMs))
        console.log(`MongoDB Disconnected`)        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {connectDB, disconnectDB} 