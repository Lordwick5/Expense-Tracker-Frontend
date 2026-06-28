import "/src/home.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const addExpense = () => {
    if (!item || !amount) return;

    const newExpense = {
      id: Date.now(),
      item: item,
      amount: amount,
    };

    setExpenses([...expenses, newExpense]);
    setItem("");
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (id) => {
    const expense = expenses.find((expense) => expense.id === id);
    setItem(expense.item);
    setAmount(expense.amount);
    deleteExpense(id);
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
              value={item}
              onChange={(e) => setItem(e.target.value)}
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button className="button" onClick={addExpense}>
              Add
            </button>
          </div>
        </div>

        {expenses.length > 0 && (
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
              {expenses.map((expense, index) => (
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
