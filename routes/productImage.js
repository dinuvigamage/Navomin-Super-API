const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM product_image", (err, result) => {
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
    "SELECT * FROM product_image WHERE Product_ID = ?",
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

router.post("/", (req, res) => {
  const { Product_ID, Image_Link } = req.body;
  dbConnection.query(
    "INSERT INTO product_image (Product_ID, Image_Link) VALUES (?, ?)",
    [Product_ID, Image_Link],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Product image added successfully!");
      }
    }
  );
});

router.put("/:Image_ID", (req, res) => {
  const { Image_ID } = req.params;
  const { Product_ID, Image_Link } = req.body;
  dbConnection.query(
    "UPDATE product_image SET Product_ID = ?, Image_Link = ? WHERE Image_ID = ?",
    [Product_ID, Image_Link, Image_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Product image updated successfully!");
      }
    }
  );
});

router.delete("/:Product_ID", (req, res) => {
  const { Product_ID } = req.params;
  dbConnection.query(
    "DELETE FROM product_image WHERE Product_ID = ?",
    [Product_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Product image deleted successfully!");
      }
    }
  );
});

module.exports = router;
