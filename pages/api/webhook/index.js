// pages/api/webhook.js
import { createHmac } from "crypto";
import axios from "axios";

// Replace 'YOUR_ACCESS_TOKEN' with your Asana Personal Access Token
const accessToken = process.env.ASANAKEY;

// Global variable to store the x-hook-secret
let secret = "";

export default async function handler(req, res) {
  if (req.headers["x-hook-secret"]) {
    console.log("This is a new webhook");
    secret = req.headers["x-hook-secret"];

    res.setHeader("X-Hook-Secret", secret);
    res.status(200).end();
  } else if (req.headers["x-hook-signature"]) {
    const computedSignature = createHmac("SHA256", secret)
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
      console.log(`Events on ${Date()}:`);
      console.log(req.body.events);
      req.body.events.forEach((event) => {
        fetchTask(event.resource.gid);
      });
    }
  } else {
    console.error("Something went wrong!");
    res.status(500).end();
  }
}

async function fetchTask(taskId) {
  const url = `https://app.asana.com/api/1.0/tasks/${taskId}`;
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  try {
    const response = await axios.get(url, { headers });
    console.log(response.data.data);
  } catch (err) {
    console.log(err);
  }
}
