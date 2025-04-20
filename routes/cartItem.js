const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM cart_item", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:Cart_ID", (req, res) => {
  const { Cart_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM cart_item WHERE Cart_ID = ?",
    [Cart_ID],
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
  const { Cart_ID, Size_ID, Quantity, Product_ID, Category_ID } = req.body;
  dbConnection.query(
    "INSERT INTO cart_item (Cart_ID, Size_ID, Quantity, Product_ID, Category_ID) VALUES (?, ?, ?, ?, ?)",
    [Cart_ID, Size_ID, Quantity, Product_ID, Category_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Cart item added successfully!");
      }
    }
  );
});

router.put("/:Cart_Item_ID", (req, res) => {
  const { Cart_Item_ID } = req.params;
  const { Cart_ID, Quantity, Product_ID } = req.body;
  dbConnection.query(
    "UPDATE cart_item SET Cart_ID = ?, Quantity = ?, Product_ID = ? WHERE Cart_Item_ID = ?",
    [Cart_ID, Quantity, Product_ID, Cart_Item_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Cart item updated successfully!");
      }
    }
  );
});

router.delete("/:Cart_Item_ID", (req, res) => {
  const { Cart_Item_ID } = req.params;
  dbConnection.query(
    "DELETE FROM cart_item WHERE Cart_Item_ID = ?",
    [Cart_Item_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Cart item deleted successfully!");
      }
    }
  );
});

module.exports = router;
