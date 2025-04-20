const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM product_category", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:ProductCategory_ID", (req, res) => {
  const { ProductCategory_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM product_category WHERE ProductCategory_ID = ?",
    [ProductCategory_ID],
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
  const { Category_ID, ProductCategory_Name } = req.body;
  dbConnection.query(
    "INSERT INTO product_category (Category_ID, ProductCategory_Name) VALUES (?, ?)",
    [Category_ID, ProductCategory_Name],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Product category added successfully!");
      }
    }
  );
});

router.put("/:ProductCategory_ID", (req, res) => {
  const { ProductCategory_ID } = req.params;
  const { Category_ID, ProductCategory_Name } = req.body;
  dbConnection.query(
    "UPDATE product_category SET Category_ID = ?, ProductCategory_Name = ? WHERE ProductCategory_ID = ?",
    [Category_ID, ProductCategory_Name, ProductCategory_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Product category updated successfully!");
      }
    }
  );
});

router.delete("/:ProductCategory_ID", (req, res) => {
  const { ProductCategory_ID } = req.params;
  dbConnection.query(
    "DELETE FROM product_category WHERE ProductCategory_ID = ?",
    [ProductCategory_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Product category deleted successfully!");
      }
    }
  );
});

module.exports = router;