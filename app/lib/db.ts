import mongoose from "mongoose";

const mongo_url = process.env.MONGODB_URI

if(!mongo_url) {
    throw new Error("Please provide MONGODB_URI in the environment variables")
}

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}
const connectDB = async () => {
    if(cached.conn) {
        return cached.conn
    }

    if(!cached.promise) {
        cached.promise = mongoose.connect(mongo_url).then((conn) => conn.connection)
    }

    try {
        cached.conn = await cached.promise
    }catch(error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}

export default connectDB
    
