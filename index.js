const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const authMiddleware = require("./src/middlewares/auth.middleware");
const rootRouter = require("./src/routes/root.route");

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/*", authMiddleware);
app.use("/", rootRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
