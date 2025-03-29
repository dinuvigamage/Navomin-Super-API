const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:User_Id", (req, res) => {
  const { User_Id } = req.params;
  dbConnection.query(
    "SELECT * FROM user WHERE User_Id = ?",
    [User_Id],
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
  const { First_Name, Last_Name, Email, Password, Phone_Number } = req.body;
  dbConnection.query(
    "INSERT INTO user (First_Name, Last_Name, Email, Password, Phone_Number) VALUES (?, ?, ?, ?, ?)",
    [First_Name, Last_Name, Email, Password, Phone_Number],
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

router.put("/:User_Id", (req, res) => {
  const { User_Id } = req.params;
  const { First_Name, Last_Name, Email, Password, Phone_Number } = req.body;
  dbConnection.query(
    "UPDATE user SET First_Name = ?, Last_Name = ?, Email = ?, Password = ?, Phone_Number = ? WHERE User_Id = ?",
    [First_Name, Last_Name, Email, Password, Phone_Number, User_Id],
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

router.delete("/:User_Id", (req, res) => {
  const { User_Id } = req.params;
  dbConnection.query(
    "DELETE FROM user WHERE User_Id = ?",
    [User_Id],
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
