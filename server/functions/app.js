const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const admin = require('firebase-admin');

const messages = require('../messages.json');

function getRandomNotification(nickName, partnerName) {
  const random = messages[Math.floor(Math.random() * messages.length)];
  return {
    title: random.title.replaceAll("{nickName}", nickName).replaceAll("{partnerName}", partnerName),
    body: random.body.replaceAll("{nickName}", nickName).replaceAll("{partnerName}", partnerName),
  };
}

const serviceAccount = require("../firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function sendNotificationToDevice(token, nickName, partnerName, res) {
  const randomMessage = getRandomNotification(nickName, partnerName);
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
  const { partnerToken, nickName, partnerName } = JSON.parse(req.body);
  if (!partnerName || !nickName || !partnerToken) {
    return res.status(400).send("Token is required");
  }
  sendNotificationToDevice(partnerToken, nickName, partnerName, res);
});

app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);

