import express from "express";
import cors from "cors"; //let's frontend running on 1 port allow to make req to backend running on another port
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expense-tracker-ndi4v6kxj-prashant-chaudharys-projects-133fa17b.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json()); //parses incoming request bodies formatted as JSON

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

export default app;
