import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";

const app = express();


app.get("/", (req, res) => {
    res.json({message:"Welcome to ebook apis"});
})

// Global error handler
app.use(globalErrorHandler)

export default app;