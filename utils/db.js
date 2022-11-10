/*
// utils/dbConnect.js
import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    // if connection is open return the instance of the databse for cleaner queries
    console.log('CONECTANDO...')
    return mongoose.connection.db;
  }

  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    poolSize: 10, //increase poolSize from default 5
  });
}

export default dbConnect;
*/


import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

/*
ALTERNATIVE VERSION
import mongoose from 'mongoose';

const connectMongo = async ()=> {
  try {

    const {connection} = await mongoose.connect(process.env.MONGODB_URI);

    if (connection.readyState === 1 ) {
      return Promise.resolve(true)
    }

  } catch (error) {
    return Promise.reject(error)
  }
}

export default connectMongo;
*/