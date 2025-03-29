const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM cart", (err, result) => {
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
    "SELECT * FROM cart WHERE Cart_ID = ?",
    [Cart_ID],
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
  const { User_ID } = req.body;
  dbConnection.query(
    "INSERT INTO cart (User_ID) VALUES (?)",
    [User_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("User added successfully!");
      }
    }
  );
});

router.put("/:Cart_ID", (req, res) => {
  const { Cart_ID } = req.params;
  const { User_ID } = req.body;
  dbConnection.query(
    "UPDATE cart SET User_ID = ? WHERE Cart_Id = ?",
    [User_ID, Cart_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("User updated successfully!");
      }
    }
  );
});

router.delete("/:Cart_ID", (req, res) => {
  const { Cart_ID } = req.params;
  dbConnection.query(
    "DELETE FROM cart WHERE Cart_ID = ?",
    [Cart_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("User deleted successfully!");
      }
    }
  );
});

module.exports = router;
