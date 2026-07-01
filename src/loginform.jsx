import React from "react";
import { useState } from "react";
import "/src/loginform.css";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const tempEmail = import.meta.env.VITE_APP_TEMP_EMAIL;
  const tempPassword = import.meta.env.VITE_APP_TEMP_PASSWORD;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email", email);
    console.log("Password", password);

    if (email === tempEmail && password === tempPassword) {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      navigate("/home");
    } else {
      alert("Please recheck your email or password.");
      navigate("/");
    }
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

        <div className="password-row">
          <input
            className="input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="button" type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button className="button submit-btn" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
