const express = require("express");
const app = express();
const port = 3000;
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/product", product);
app.use("/auth", user);

/* Error handler middleware with four parameters */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
