const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM order_table", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:Order_ID", (req, res) => {
  const { Order_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM order_table WHERE Order_ID = ?",
    [Order_ID],
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

router.get("/user/:User_ID", (req, res) => {
  const { User_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM order_table WHERE User_ID = ?",
    [User_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.json(result);
      }
    }
  );
});

router.post("/", (req, res) => {
  const { User_ID, Pickup_Time, Status, Total_Amount } = req.body;
  dbConnection.query(
    "INSERT INTO order_table (User_ID, Pickup_Time, Status, Total_Amount) VALUES (?, ?, ?, ?)",
    [User_ID, Pickup_Time, Status, Total_Amount],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.json({ Order_ID: result.insertId });
      }
    }
  );
});

router.put("/:Order_ID", (req, res) => {
  const { Order_ID } = req.params;
  const { User_ID, Pickup_Time, Status, Total_Amount } = req.body;
  dbConnection.query(
    "UPDATE order_table SET User_ID = ?, Pickup_Time = ?, Status = ?, Total_Amount = ? WHERE Order_ID = ?",
    [User_ID, Pickup_Time, Status, Total_Amount, Order_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Order updated successfully!");
      }
    }
  );
});

router.put("/status/:Order_ID", (req, res) => {
  const { Order_ID } = req.params;
  const { Status } = req.body;
  dbConnection.query(
    "UPDATE order_table SET Status = ? WHERE Order_ID = ?",
    [Status, Order_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Order status updated successfully!");
      }
    }
  );
});

router.delete("/:Order_ID", (req, res) => {
  const { Order_ID } = req.params;
  dbConnection.query(
    "DELETE FROM order_table WHERE Order_ID = ?",
    [Order_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Order deleted successfully!");
      }
    }
  );
});

module.exports = router;
