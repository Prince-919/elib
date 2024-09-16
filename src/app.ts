import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ebook apis" });
});

// Routes
app.use("/api/users", userRouter);

// Global error handler
app.use(globalErrorHandler);

export default app;
