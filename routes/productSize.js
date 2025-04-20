const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM product_size", (err, result) => {
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
    "SELECT * FROM product_size WHERE Product_ID = ?",
    [Product_ID],
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

router.get("/size/:Size_ID", (req, res) => {
  const { Size_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM product_size WHERE Size_ID = ?",
    [Size_ID],
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
  const { Product_ID, Price, Size } = req.body;
  dbConnection.query(
    "INSERT INTO product_size (Product_ID, Price, Size) VALUES (?, ?, ?)",
    [Product_ID, Price, Size],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Product size added successfully!");
      }
    }
  );
});

router.put("/:Size_ID", (req, res) => {
  const { Size_ID } = req.params;
  const { Product_ID, Price, Size } = req.body;
  dbConnection.query(
    "UPDATE product_size SET Product_ID = ?, Price = ?, Size = ? WHERE Size_ID = ?",
    [Product_ID, Price, Size, Size_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Product size updated successfully!");
      }
    }
  );
});

router.delete("/:Size_ID", (req, res) => {
  const { Size_ID } = req.params;
  dbConnection.query(
    "DELETE FROM product_size WHERE Size_ID = ?",
    [Size_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Product size deleted successfully!");
      }
    }
  );
});

module.exports = router;
