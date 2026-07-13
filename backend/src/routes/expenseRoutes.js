import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

router.use(protect);

router.get("/", getExpenses);
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
