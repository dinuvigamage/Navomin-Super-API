const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM product", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:Product_ID", (req, res) => {
  const { Product_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM product WHERE Product_ID = ?",
    [Product_ID],
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
  const { ProductCategory_ID, Product_Name, Product_Description } = req.body;
  dbConnection.query(
    "INSERT INTO product (ProductCategory_ID, Product_Name, Product_Description) VALUES (?, ?, ?)",
    [ProductCategory_ID, Product_Name, Product_Description],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Product added successfully!");
      }
    }
  );
});

router.put("/:Product_ID", (req, res) => {
  const { Product_ID } = req.params;
  const { ProductCategory_ID, Product_Name, Product_Description } = req.body;
  dbConnection.query(
    "UPDATE product SET ProductCategory_ID = ?, Product_Name = ?, Product_Description = ? WHERE Product_ID = ?",
    [ProductCategory_ID, Product_Name, Product_Description, Product_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Product updated successfully!");
      }
    }
  );
});

router.delete("/:Product_ID", (req, res) => {
  const { Product_ID } = req.params;
  dbConnection.query(
    "DELETE FROM product WHERE Product_ID = ?",
    [Product_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Product deleted successfully!");
      }
    }
  );
});

module.exports = router;
