import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

// Your DeleteTask function remains unchanged

export async function DeleteTask(asanaGid) {
  try {
    let response = await fetch(
      "https://pool-asana.vercel.app/api/tickets/delete?asanaGid=" + asanaGid,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        timeout: 50000, // Adjust the timeout value as needed (in milliseconds)
      }
    );
    response = await response.json();
  } catch (error) {
    console.log("An error occurred while deleting ", error);
  }
}

const taskData = {
  name: "Sample Task",
  assignee: "John Doe",
  workspace: "Workplace",
  asanaGID: "123456",
  nummer: "Task123",
  project: "ProjectXYZ",
  status: "In Progress",
  termin: "2024-02-11",
};

export async function insertTask() {
  try {
    let response = await fetch(
      "https://pool-asana.vercel.app/api/tickets/add",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData), // Add your payload here
        timeout: 50000, // Adjust the timeout value as needed (in milliseconds)
      }
    );
    response = await response.json();
  } catch (error) {
    console.log("An error occurred while adding ", error);
  }
}

export async function getTask(asanaGid) {
  try {
    let response = await fetch(
      "https://pool-asana.vercel.app/api/tickets/delete?asanaGid=" + asanaGid,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        timeout: 50000, // Adjust the timeout value as needed (in milliseconds)
      }
    );
    response = await response.json();
  } catch (error) {
    console.log("An error occurred while deleting ", error);
  }
}
