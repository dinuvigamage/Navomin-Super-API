const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM order_item", (err, result) => {
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
    "SELECT * FROM order_item WHERE Order_ID = ?",
    [Order_ID],
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
  const { Order_ID, Product_ID, Size_ID, Quantity } = req.body;
  dbConnection.query(
    "INSERT INTO order_item (Order_ID, Product_ID, Size_ID, Quantity) VALUES (?, ?, ?, ?)",
    [Order_ID, Product_ID, Size_ID, Quantity],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Order item added successfully!");
      }
    }
  );
});

router.put("/:OrderItem_ID", (req, res) => {
  const { OrderItem_ID } = req.params;
  const { Order_ID, Product_ID } = req.body;
  dbConnection.query(
    "UPDATE order_item SET Order_ID = ?, Product_ID = ? WHERE OrderItem_ID = ?",
    [Order_ID, Product_ID, OrderItem_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Order item updated successfully!");
      }
    }
  );
});

router.delete("/:OrderItem_ID", (req, res) => {
  const { OrderItem_ID } = req.params;
  dbConnection.query(
    "DELETE FROM order_item WHERE OrderItem_ID = ?",
    [OrderItem_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Order item deleted successfully!");
      }
    }
  );
});

module.exports = router;
