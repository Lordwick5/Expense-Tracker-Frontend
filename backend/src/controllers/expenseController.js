import Expense from "../models/Expense.js";

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ expenses });
  } catch (error) {
    console.error("Get expenses error:", error);
    res.status(500).json({ message: "Server error while fetching expenses." });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { item, amount } = req.body;

    if (!item || !amount) {
      return res.status(400).json({ message: "Item and amount are required." });
    }

    const expense = await Expense.create({
      userId: req.userId,
      item,
      amount,
    });

    res.status(201).json({ expense });
  } catch (error) {
    console.error("Add expense error:", error);
    res.status(500).json({ message: "Server error while adding expense." });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { item, amount } = req.body;

    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { item, amount },
      { new: true },
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    res.status(200).json({ expense });
  } catch (error) {
    console.error("Update expense error:", error);
    res.status(500).json({ message: "Server error while updating expense." });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.userId });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found." });
    }

    res.status(200).json({ message: "Expense deleted." });
  } catch (error) {
    console.error("Delete expense error:", error);
    res.status(500).json({ message: "Server error while deleting expense." });
  }
};
