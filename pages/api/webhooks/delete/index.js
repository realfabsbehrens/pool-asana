// pages/api/webhook.js
import crypto from "crypto";
import { createHmac } from "crypto";
import { deleteTasksByAsanaGid } from "@/lib/mongo/tasks";

// Replace 'YOUR_ACCESS_TOKEN' with your Asana Personal Access Token
const accessToken = process.env.ASANAKEY;

// Global variable to store the x-hook-secret
let secret = "";

export default async function handler(req, res) {
  try {
    if (req.headers["x-hook-secret"]) {
      console.log("This is a new webhook");
      secret = req.headers["x-hook-secret"];
      res.setHeader("X-Hook-Secret", secret);
      res.status(200).end();
    } else if (req.headers["x-hook-signature"]) {
      // Ensure proper JSON parsing
      const requestBody = JSON.stringify(req.body);

      const computedSignature = createHmac("SHA256", secret || "")
        .update(requestBody)
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
          asanaGID = "1206563694589846";
          await aufgabeloeschen(asanaGID);
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

export async function aufgabeloeschen(asanaGID) {
  try {
    const result = await deleteTasksByAsanaGid(asanaGID);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
