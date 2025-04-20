const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM category", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:Category_ID", (req, res) => {
  const { Category_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM category WHERE Category_ID = ?",
    [Category_ID],
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
  const { Category_Name } = req.body;
  dbConnection.query(
    "INSERT INTO category (Category_Name) VALUES (?)",
    [Category_Name],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Category added successfully!");
      }
    }
  );
});

router.put("/:Category_ID", (req, res) => {
  const { Category_ID } = req.params;
  const { Category_Name } = req.body;
  dbConnection.query(
    "UPDATE category SET Category_Name = ? WHERE Category_ID = ?",
    [Category_Name, Category_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Category updated successfully!");
      }
    }
  );
});

router.delete("/:Category_ID", (req, res) => {
  const { Category_ID } = req.params;
  dbConnection.query(
    "DELETE FROM category WHERE Category_ID = ?",
    [Category_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Category deleted successfully!");
      }
    }
  );
});

module.exports = router;