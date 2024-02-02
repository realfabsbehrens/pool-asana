// index.js
const express = require("express");
const crypto = require("crypto");
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

// Replace 'YOUR_ACCESS_TOKEN' with your Asana Personal Access Token
const accessToken = process.env.ASANAKEY;

// Initializes Express app.
const app = express();

// Parses JSON bodies.
app.use(express.json());

// Global variable to store the x-hook-secret
let secret = "";

// Local endpoint for receiving events
app.post("/receiveWebhook", (req, res) => {
  if (req.headers["x-hook-secret"]) {
    console.log("This is a new webhook");
    secret = req.headers["x-hook-secret"];

    res.setHeader("X-Hook-Secret", secret);
    res.sendStatus(200);
  } else if (req.headers["x-hook-signature"]) {
    const computedSignature = crypto
      .createHmac("SHA256", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(req.headers["x-hook-signature"]),
        Buffer.from(computedSignature)
      )
    ) {
      // Fail
      res.sendStatus(401);
    } else {
      // Success
      res.sendStatus(200);
      console.log(`Events on ${Date()}:`);
      console.log(req.body.events);
      req.body.events.forEach((event) => {
        fetchTask(event.resource.gid);
      });
    }
  } else {
    console.error("Something went wrong!");
  }
});

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

app.listen(8080, () => {
  console.log(`Server started on port 8080`);
});
