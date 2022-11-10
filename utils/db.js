// https://blog.devtylerjones.com/how_to_configure_next-auth_with_mongodb_atlas_mongoose
// utils/dbConnect.js
import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    // if connection is open return the instance of the databse for cleaner queries
    console.log('Reusando conexion...')
    return mongoose.connection.db;
  }

  console.log('creando nueva conexion')
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

  });
}

export default dbConnect;


// EXAMPLE FROM NEXTJS
// https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js
/*
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
/*
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect
*/
// END EXAMPLE FROM NEXTJS

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