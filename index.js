const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnection");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

app.use(cors()); // Enable CORS

app.use("/user", require("./routes/user"));
app.use("/cart", require("./routes/cart"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
