const mongoose = require('mongoose')
const Nutrient = require('../models/nutrientModel')
const unitEnum = require('../../enums/unitEnum')
const typeEnum = require('../../enums/nutrientTypeEnum')

let conn

const connectDB = async () => {
    try {
        conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        initNutrientsCollection()
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

const initNutrientsCollection = async () => {
    try {
        const collections = await conn.connection.db.listCollections().toArray()

        if(!(collections.some(collection => collection.name === 'nutrients'))){
            console.log(`Initializing collection: nutrients to MongoDB`)
            const data = require('./init_nutrients.json')

            for(const key in data){

                const type = Object.values(typeEnum.nutrientType).includes(data[key].type) ? data[key].type : typeEnum.nutrientType.undefined
                const unit = Object.values(unitEnum.unit).includes(data[key].unit) ? data[key].unit : unitEnum.unit.undefined 
                const nutrient = await Nutrient.create({
                    name: data[key].name,
                    type: type,
                    unit: unit
                })
            }
            console.log(`Initialized collection: nutrients to MongoDB`)  
        }
        else{
            console.log(`Collection: nutrients already exist in MongoDB`)    
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = {connectDB, disconnectDB} 