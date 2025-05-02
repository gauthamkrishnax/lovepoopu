const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const admin = require('firebase-admin');

const messages = require('../messages.json');
const serviceAccount = require("../firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function sendNotificationToDevice(token, message, res) {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  const payload = {
    data: {
      title: randomMessage.title,
      body: randomMessage.body,
    },
    notification: {
      title: randomMessage.title,
      body: randomMessage.body,
    },

    android: {
      priority: "high",
      notification: {
        channelId: "high_priority_channel",
      },
    },
    token: token,
  };

  admin.messaging().send(payload)
    .then(response => {
      console.log('Successfully sent message:', response);
      res.send("Notification sent successfully!");
    })
    .catch(error => {
      res.status(500).send("Error sending notification");
      console.error('Error sending message:', error);
    });
}

router.get("/", (req, res) => {
  res.send("Hello from the serverless function!");
});

router.post("/", (req, res) => {
  const { token, message } = JSON.parse(req.body);
  if (!token || !message) {
    return res.status(400).send("Token and message are required");
  }
  sendNotificationToDevice(token, message, res);
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);

