const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM notification", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:Notification_ID", (req, res) => {
  const { Notification_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM notification WHERE Notification_ID = ?",
    [Notification_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.json(result[0]);
      }
    }
  );
});

router.post("/", (req, res) => {
  const { User_ID, Owner_ID, Sent_Date, Message, Sent_Time } = req.body;
  dbConnection.query(
    "INSERT INTO notification (User_ID, Owner_ID, Sent_Date, Message, Sent_Time) VALUES (?, ?, ?, ?, ?)",
    [User_ID, Owner_ID, Sent_Date, Message, Sent_Time],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Notification added successfully!");
      }
    }
  );
});

router.put("/:Notification_ID", (req, res) => {
  const { Notification_ID } = req.params;
  const { User_ID, Owner_ID, Sent_Date, Message, Sent_Time } = req.body;
  dbConnection.query(
    "UPDATE notification SET User_ID = ?, Owner_ID = ?, Sent_Date = ?, Message = ?, Sent_Time = ? WHERE Notification_ID = ?",
    [User_ID, Owner_ID, Sent_Date, Message, Sent_Time, Notification_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Notification updated successfully!");
      }
    }
  );
});

router.delete("/:Notification_ID", (req, res) => {
  const { Notification_ID } = req.params;
  dbConnection.query(
    "DELETE FROM notification WHERE Notification_ID = ?",
    [Notification_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Notification deleted successfully!");
      }
    }
  );
});

module.exports = router;