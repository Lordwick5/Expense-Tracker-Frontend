import "/src/home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [expenseData, setExpenseData] = useState({
    item: "",
    amount: "",
    expenses: [],
  });

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const addExpense = () => {
    if (!expenseData.item || !expenseData.amount) return;

    const newExpense = {
      id: Date.now(),
      item: expenseData.item,
      amount: expenseData.amount,
    };

    setExpenseData({
      ...expenseData,
      expenses: [...expenseData.expenses, newExpense],
      item: "",
      amount: "",
    });
  };

  const deleteExpense = (id) => {
    setExpenseData({
      ...expenseData,
      expenses: expenseData.expenses.filter((expense) => expense.id !== id),
    });
  };

  const editExpense = (id) => {
    const expense = expenseData.expenses.find((expense) => expense.id === id);
    setExpenseData({
      ...expenseData,
      item: expense.item,
      amount: expense.amount,
      expenses: expenseData.expenses.filter((e) => e.id !== id),
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addExpense();
    }
  };

  return (
    <div className="container">
      <main>
        <button className="logout" onClick={logout}>
          Logout
        </button>
        <h1>Welcome to Expense Tracker</h1>
        <br />
        <p>Please enter your expenses with amount below</p>

        <div className="expense-input">
          <div className="input-row">
            <label htmlFor="item">Item</label>
            <input
              id="item"
              type="text"
              placeholder="Enter your item"
              value={expenseData.item}
              onChange={(e) => setExpenseData({ ...expenseData, item: e.target.value })}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </div>

          <div className="input-row">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="text"
              placeholder="Enter your amount"
              value={expenseData.amount}
              onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button className="button" onClick={addExpense}>
              Add
            </button>
          </div>
        </div>

        {expenseData.expenses.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.expenses.map((expense, index) => (
                <tr key={expense.id}>
                  <td>{index + 1}</td>
                  <td>{expense.item}</td>
                  <td>Rs. {expense.amount}</td>
                  <td>
                    <button className="edit-btn" onClick={() => editExpense(expense.id)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => deleteExpense(expense.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default Home;
