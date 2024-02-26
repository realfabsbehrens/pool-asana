// pages/api/webhook.js
import crypto from "crypto";
import { createHmac } from "crypto";
import { updateTask } from "@/lib/mongodb";

// Replace 'YOUR_ACCESS_TOKEN' with your Asana Personal Access Token
const accessToken = process.env.ASANAKEY;

// Global variable to store the x-hook-secret
let secret = "";

export default async function handler(req, res) {
  try {
    if (req.headers["x-hook-secret"]) {
      console.log("Neuer Webhook: UPDATE");
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
        if (req.body.events[0].resource.gid) {
          try {
            let asanaGID = req.body.events[0].resource.gid;
            console.log(asanaGID);

            let taskData = {
              name: "updated",
              assignee: "moin@fabsbehrens.de",
              workspace: "Workplace",
              asanaGID: asanaGID,
              nummer: "test nummer",
              project: "testkunde",
              status: "offen",
              termin: "24-12-20",
            };

            await updateTask(taskData);
          } catch (error) {
            console.log(error);
          }
        }

        // Success
        res.status(200).end();
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
