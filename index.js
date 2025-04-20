const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnection");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

app.use(cors()); // Enable CORS

app.use("/user", require("./routes/user"));
app.use("/cart", require("./routes/cart"));
app.use("/cartItem", require("./routes/cartItem"));
app.use("/category", require("./routes/category"));
app.use("/notification", require("./routes/notification"));
app.use("/preOrder", require("./routes/preOrder"));
app.use("/preOrderItem", require("./routes/preOrderItem"));
app.use("/creditProfile", require("./routes/creditProfile"));
app.use("/product", require("./routes/product"));
app.use("/productSize", require("./routes/productSize"));
app.use("/productImage", require("./routes/productImage"));
app.use("/productCategory", require("./routes/productCategory"));
app.use("/order", require("./routes/orderTable"));
app.use("/orderItem", require("./routes/orderItem"));
app.use("/owner", require("./routes/owner"));
app.use("/report", require("./routes/report"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
