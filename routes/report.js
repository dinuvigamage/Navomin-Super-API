const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM report", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:Report_ID", (req, res) => {
  const { Report_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM report WHERE Report_ID = ?",
    [Report_ID],
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
  const { Owner_ID, Start_Date, End_Date, Generate_Date, Report_Type } =
    req.body;
  dbConnection.query(
    "INSERT INTO report (Owner_ID, Start_Date, End_Date, Generate_Date, Report_Type) VALUES (?, ?, ?, ?, ?)",
    [Owner_ID, Start_Date, End_Date, Generate_Date, Report_Type],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(201).send("Report added successfully!");
      }
    }
  );
});

router.put("/:Report_ID", (req, res) => {
  const { Report_ID } = req.params;
  const { Owner_ID, Start_Date, End_Date, Generate_Date, Report_Type } =
    req.body;
  dbConnection.query(
    "UPDATE report SET Owner_ID = ?, Start_Date = ?, End_Date = ?, Generate_Date = ?, Report_Type = ? WHERE Report_ID = ?",
    [Owner_ID, Start_Date, End_Date, Generate_Date, Report_Type, Report_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Report updated successfully!");
      }
    }
  );
});

router.delete("/:Report_ID", (req, res) => {
  const { Report_ID } = req.params;
  dbConnection.query(
    "DELETE FROM report WHERE Report_ID = ?",
    [Report_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Report deleted successfully!");
      }
    }
  );
});

module.exports = router;
