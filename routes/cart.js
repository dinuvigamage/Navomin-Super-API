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

router.get("/:User_ID", (req, res) => {
  const { User_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM cart WHERE User_ID = ?",
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
  const { User_ID } = req.body;
  dbConnection.query(
    "INSERT INTO cart (User_ID) VALUES (?)",
    [User_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Cart created successfully!");
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
        res.status(200).send("Cart updated successfully!");
      }
    }
  );
});

router.put("/cartDisable/:Cart_ID", (req, res) => {
  const { Cart_ID } = req.params;
  dbConnection.query(
    "UPDATE cart SET IS_ACTIVE = 0 WHERE Cart_Id = ?",
    [Cart_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Cart disabled successfully!");
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
        res.status(200).send("Cart deleted successfully!");
      }
    }
  );
});

module.exports = router;
