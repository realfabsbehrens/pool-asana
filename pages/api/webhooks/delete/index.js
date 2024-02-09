// pages/api/webhook.js
import crypto from "crypto";
import { createHmac } from "crypto";
import { deleteTasksByAsanaGid } from "@/lib/mongo/tasks";

// Replace 'YOUR_ACCESS_TOKEN' with your Asana Personal Access Token
const accessToken = process.env.ASANAKEY;

// Global variable to store the x-hook-secret
let secret = "";

// clientPromise importieren von Globas
import clientPromise from ".";

// value initieren
let client;
let db;
let tasks;

async function init() {
  if (!db) {
    try {
      client = await clientPromise;
      db = await client.db("poool");
      tasks = await db.collection("projects");
      console.log("Database connected");
    } catch (error) {
      console.error(
        "Failed to establish connection to the database:",
        error.message
      );
      throw error; // Re-throw the error to signal initialization failure
    }
  }
}

(async () => {
  await init();
})();

//////////////
/// MOVIES //
////////////

export async function getTasks() {
  try {
    if (!tasks) await init();
    const result = await tasks
      .find({})
      .map((user) => ({ ...user, _id: user._id.toString() }))
      .toArray();

    return { tasks: result };
  } catch (error) {
    return { error: "Failed to fetch movies!" };
  }
}

// Neue Funktion zum Löschen von Aufgaben mit einer bestimmten asana_gid
 function deleteTasksByAsanaGid(asanaGid) {
  try {
    await init();
    console.log("Deleting task with Asana GID:", asanaGid);
    const result = await tasks.deleteOne({ asanaGID: asanaGid });
    console.log("Deletion result:", result);
    return { success: result.deletedCount > 0 };
  } catch (error) {
    console.error("Failed to delete tasks:", error.message);
    return { error: "Failed to delete tasks!" };
  }
}

export default async function handler(req, res) {
  try {
    if (req.headers["x-hook-secret"]) {
      console.log("This is a new webhook");
      secret = req.headers["x-hook-secret"];
      res.setHeader("X-Hook-Secret", secret);
      res.status(200).end();
    } else if (req.headers["x-hook-signature"]) {
      const computedSignature = createHmac("SHA256", secret || "")
        .update(JSON.stringify(req.body))
        .digest("hex");

      if (
        !crypto.timingSafeEqual(
          Buffer.from(req.headers["x-hook-signature"]),
          Buffer.from(computedSignature)
        )
      ) {
        // Fail
        res.status(401).end();
      } else {
        // Success
        res.status(200).end();
        if (req.body.events[0]) {
          let asanaGID = "1206564621183618";
          console.log(
            "Response angekommen, Asana GID to be deleted:",
            asanaGID
          );
          //  let asanaGID = req.body.events[0].resource.gid;
          try {
            let deleteTask = await deleteTasksByAsanaGid(asanaGID);
            console.log("Ergebnis von deleteTasksByAsanaGid:", deleteTask);
          } catch (error) {
            console.error(
              "Fehler beim Aufruf von deleteTasksByAsanaGid:",
              error
            );
          }
        }
      }
    } else {
      console.error("Invalid request");
      res.status(400).end();
    }
  } catch (error) {
    console.error("Error in handler:", error.message);
    res.status(500).end();
  }
}
