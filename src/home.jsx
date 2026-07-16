import "/src/home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  const [item, setItem] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
        headers: authHeaders,
      });

      if (response.status === 401) {
        logout();
        return;
      }

      const result = await response.json();
      setExpenses(result.expenses);
    } catch (err) {
      console.error("Fetch expenses error:", err);
      setErrorMessage("Could not load expenses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async () => {
    if (!item.trim()) {
      setErrorMessage("Please enter an item.");
      return;
    }

    if (!amount) {
      setErrorMessage("Please enter an amount.");
      return;
    }

    setErrorMessage("");

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/expenses/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/expenses`;
      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify({ item, amount }),
      });

      if (!response.ok) {
        const result = await response.json();
        setErrorMessage(result.message || "Could not save expense.");
        return;
      }

      setItem("");
      setAmount("");
      setEditingId(null);
      fetchExpenses();
    } catch (err) {
      console.error("Add expense error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      fetchExpenses();
    } catch (err) {
      console.error("Delete expense error:", err);
      setErrorMessage("Could not delete expense.");
    }
  };

  const editExpense = (expense) => {
    setItem(expense.item);
    setAmount(expense.amount);
    setEditingId(expense._id);
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
              required
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  setItem(value);
                }
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </div>

          <div className="input-row">
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              inputMode="numeric"
              placeholder="Enter your amount"
              required
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setAmount(value);
                }
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <button className="button" onClick={addExpense}>
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        {loading ? (
          <p>Loading expenses...</p>
        ) : (
          expenses.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={expense._id}>
                    <td>{index + 1}</td>
                    <td>{expense.item}</td>
                    <td>Rs. {expense.amount}</td>
                    <td>
                      <button className="edit-btn" onClick={() => editExpense(expense)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => deleteExpense(expense._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </main>
    </div>
  );
}

export default Home;
