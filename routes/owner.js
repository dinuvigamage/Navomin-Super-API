const express = require("express");
const dbConnection = require("../dbConnection");

const router = express.Router();

router.get("/all", (req, res) => {
  dbConnection.query("SELECT * FROM owner", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Something went wrong!");
    } else {
      res.json(result);
    }
  });
});

router.post("/login", (req, res) => {
  const { Email, Password } = req.body;
  dbConnection.query(
    "SELECT * FROM owner WHERE Email = ? AND Password = ?",
    [Email, Password],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
      } else if (result.length === 0) {
        res.status(401).send("Invalid email or password!");
      } else {
        res.json(result[0]);
      }
    }
  );
});

router.get("/id/:Owner_ID", (req, res) => {
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

// SELECT SUM(TOTAL_SALES) AS TOTAL_SALES
// FROM (
//     SELECT SUM(S1.Price * O.Quantity) AS TOTAL_SALES
//     FROM navomin_super.order_item O
//     LEFT JOIN navomin_super.product_size S1 ON O.Product_ID = S1.Product_ID

//     UNION ALL

//     SELECT SUM(S2.Price * P.Quantity) AS TOTAL_SALES
//     FROM navomin_super.pre_order_item P
//     LEFT JOIN navomin_super.product_size S2 ON P.Product_ID = S2.Product_ID
// ) AS DATA

router.get("/totalSales/", (req, res) => {
  dbConnection.query(
    `SELECT SUM(TOTAL_SALES) AS TOTAL_SALES
     FROM (
         SELECT SUM(S1.Price * O.Quantity) AS TOTAL_SALES
         FROM navomin_super.order_item O
         LEFT JOIN navomin_super.product_size S1 ON O.Product_ID = S1.Product_ID

         UNION ALL

         SELECT SUM(S2.Price * P.Quantity) AS TOTAL_SALES
         FROM navomin_super.pre_order_item P
         LEFT JOIN navomin_super.product_size S2 ON P.Product_ID = S2.Product_ID
     ) AS DATA`,
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

// order sales
router.get("/orderSales", async (req, res) => {
  dbConnection.query(
    `SELECT SUM(S1.Price * O.Quantity) AS TOTAL_SALES
     FROM navomin_super.order_item O
     LEFT JOIN navomin_super.product_size S1 ON O.Product_ID = S1.Product_ID`,
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

// pre-order sales
router.get("/preOrderSales", async (req, res) => {
  dbConnection.query(
    `SELECT SUM(S2.Price * P.Quantity) AS TOTAL_SALES
     FROM navomin_super.pre_order_item P
     LEFT JOIN navomin_super.product_size S2 ON P.Product_ID = S2.Product_ID`,
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

module.exports = router;
