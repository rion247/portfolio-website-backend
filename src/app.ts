import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middleware/notFound";
import globalErrorHandler from "./app/middleware/globalErrorHandler";

const app = express();
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
