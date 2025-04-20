const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM pre_order_item", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:Pre_Order_Item_ID", (req, res) => {
  const { Pre_Order_Item_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM pre_order_item WHERE Pre_Order_Item_ID = ?",
    [Pre_Order_Item_ID],
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
  const { Pre_Order_ID, Ingredients, Product_ID, Size_ID, Quantity } = req.body;
  dbConnection.query(
    "INSERT INTO pre_order_item (Pre_Order_ID, Ingredients, Product_ID, Size_ID, Quantity) VALUES (?, ?, ?, ?, ?)",
    [Pre_Order_ID, Ingredients, Product_ID, Size_ID, Quantity],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Pre-order item added successfully!");
      }
    }
  );
});

router.put("/:Pre_Order_Item_ID", (req, res) => {
  const { Pre_Order_Item_ID } = req.params;
  const { Pre_Order_ID, Ingredients, Product_ID } = req.body;
  dbConnection.query(
    "UPDATE pre_order_item SET Pre_Order_ID = ?, Ingredients = ?, Product_ID = ? WHERE Pre_Order_Item_ID = ?",
    [Pre_Order_ID, Ingredients, Product_ID, Pre_Order_Item_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Pre-order item updated successfully!");
      }
    }
  );
});

router.delete("/:Pre_Order_Item_ID", (req, res) => {
  const { Pre_Order_Item_ID } = req.params;
  dbConnection.query(
    "DELETE FROM pre_order_item WHERE Pre_Order_Item_ID = ?",
    [Pre_Order_Item_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Pre-order item deleted successfully!");
      }
    }
  );
});

module.exports = router;
