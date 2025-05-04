const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/", (req, res) => {
  dbConnection.query("SELECT * FROM pre_order", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.get("/:Pre_Order_ID", (req, res) => {
  const { Pre_Order_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM pre_order WHERE Pre_Order_ID = ?",
    [Pre_Order_ID],
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

router.get("/user/:User_ID", (req, res) => {
  const { User_ID } = req.params;
  dbConnection.query(
    "SELECT * FROM pre_order WHERE User_ID = ?",
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
  const { User_ID, Half_Paid, Estimated_Total, Pickup_Date, Pickup_Time } =
    req.body;
  dbConnection.query(
    "INSERT INTO pre_order (User_ID, Half_Paid, Estimated_Total, Pickup_Date, Pickup_Time, Status) VALUES (?, ?, ?, ?, ?, ?)",
    [User_ID, Half_Paid, Estimated_Total, Pickup_Date, Pickup_Time, "Pending"],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.json({ Pre_Order_ID: result.insertId });
      }
    }
  );
});

router.put("/:Pre_Order_ID", (req, res) => {
  const { Pre_Order_ID } = req.params;
  const { User_ID, Half_Paid, Estimated_Total, Pickup_Date, Pickup_Time } =
    req.body;
  dbConnection.query(
    "UPDATE pre_order SET Half_Paid = ?, Estimated_Total = ?, Pickup_Date = ?, Pickup_Time = ? WHERE Pre_Order_ID = ?",
    [Half_Paid, Estimated_Total, Pickup_Date, Pickup_Time, Pre_Order_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Pre-order updated successfully!");
      }
    }
  );
});

router.put("/status/:Pre_Order_ID", (req, res) => {
  const { Pre_Order_ID } = req.params;
  const { Status } = req.body;
  dbConnection.query(
    "UPDATE pre_order SET Status = ? WHERE Pre_Order_ID = ?",
    [Status, Pre_Order_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Pre-order status updated successfully!");
      }
    }
  );
});

router.put("/estiPrice/:Pre_Order_ID", (req, res) => {
  const { Pre_Order_ID } = req.params;
  const { Estimated_Total } = req.body;
  dbConnection.query(
    "UPDATE pre_order SET Estimated_Total = ? WHERE Pre_Order_ID = ?",
    [Estimated_Total, Pre_Order_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Pre-order estimated price updated successfully!");
      }
    }
  );
});

router.delete("/:Pre_Order_ID", (req, res) => {
  const { Pre_Order_ID } = req.params;
  dbConnection.query(
    "DELETE FROM pre_order WHERE Pre_Order_ID = ?",
    [Pre_Order_ID],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else {
        res.status(200).send("Pre-order deleted successfully!");
      }
    }
  );
});

module.exports = router;
