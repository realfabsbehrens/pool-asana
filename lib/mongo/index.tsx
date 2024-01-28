import { MongoClient } from "mongodb";

// get mongo client from mongo

// read the uri from env-local
const URI = process.env.MONGODB_URI;
const options = {};
// error if now uri given
if (!URI) throw new Error("Please add your URL to .env.local");

let client = new MongoClient(URI, options);
let clientPromise;

// share mongo client in global variable
if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }

  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
