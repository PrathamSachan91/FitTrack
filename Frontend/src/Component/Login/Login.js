import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { setUser } from "../redux/authSlice";
import { Dumbbell } from "lucide-react";
import "./Login.css";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const showAlert = (msg, type) => {
    setAlert(msg);
    setAlertType(type);
    setTimeout(() => {
      setAlert("");
      setAlertType("");
    }, 1500);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  /* ---------------- EMAIL + PASSWORD LOGIN ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/login", values, {
        withCredentials: true,
      });

      showAlert(res.data.message, "success");

      dispatch(setUser());
      queryClient.invalidateQueries(["me"]);
      queryClient.invalidateQueries(["register-status"]);

      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      showAlert(err.response?.data?.message || "Login failed", "error");
    }
  };

  /* ---------------- GOOGLE LOGIN ---------------- */
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      await axios.post(
        "http://localhost:3001/api/google-login",
        { credential: credentialResponse.credential },
        { withCredentials: true },
      );

      showAlert("Google login successful", "success");

      dispatch(setUser());
      queryClient.invalidateQueries(["me"]);
      queryClient.invalidateQueries(["register-status"]);

      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      showAlert(err.response?.data?.message || "Google login failed", "error");
    }
  };

  return (
    <div className="login-page">
      {/* ground */}
      <div className="login-bg">
        <div className="login-bg-decoration-1" />
        <div className="login-bg-decoration-2" />
      </div>

      <div className="login-container">
        {/* Card */}
        <div className="login-card">
          <div className="login-back">
            <Link to="/">← Back to home</Link>
          </div>
          <div className="login-card-header">
            <Link to="/" className="login-logo-link">
              <Dumbbell className="login-logo-icon" />
              <span className="login-logo-text">FitTrack Login</span>
            </Link>
          </div>
          {alert && <div className={`alert ${alertType}`}>{alert}</div>}

          <div className="login-card-content">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={values.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={values.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="login-forgot">
                <Link to="/resetPassword">Forgot password?</Link>
              </div>

              <button type="submit" className="login-submit-btn">
                Sign In
              </button>
            </form>

            {/* OR */}
            <div className="login-divider">OR</div>

            {/* Google Login */}
            <div className="login-google">
              <GoogleLogin onSuccess={handleGoogleLogin} />
            </div>

            <div className="login-signup">
              <p>
                Don't have an account?{" "}
                <Link to="/signin" className="login-signup-link">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
