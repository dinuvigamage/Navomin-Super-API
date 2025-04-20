const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM owner", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:Owner_ID", (req, res) => {
  const { Owner_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM owner WHERE Owner_ID = ?",
    [Owner_ID],
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
  const { Name, Email, Phone_Number, Password } = req.body;
  dbConnection.query(
    "INSERT INTO owner (Name, Email, Phone_Number, Password) VALUES (?, ?, ?, ?)",
    [Name, Email, Phone_Number, Password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Owner added successfully!");
      }
    }
  );
});

router.put("/:Owner_ID", (req, res) => {
  const { Owner_ID } = req.params;
  const { Name, Email, Phone_Number, Password } = req.body;
  dbConnection.query(
    "UPDATE owner SET Name = ?, Email = ?, Phone_Number = ?, Password = ? WHERE Owner_ID = ?",
    [Name, Email, Phone_Number, Password, Owner_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Owner updated successfully!");
      }
    }
  );
});

router.delete("/:Owner_ID", (req, res) => {
  const { Owner_ID } = req.params;
  dbConnection.query(
    "DELETE FROM owner WHERE Owner_ID = ?",
    [Owner_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Owner deleted successfully!");
      }
    }
  );
});

module.exports = router;