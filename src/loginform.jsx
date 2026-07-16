import React from "react";
import { useState } from "react";
import "/src/loginform.css";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [createACcount, setCreateAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <div className="password-field">
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="toggle-password"
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <button className="button submit-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>

        <button className="button register-btn" type="button" onClick={handleRegisterClick}>
          Register / Create an account
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
