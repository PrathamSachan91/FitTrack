import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { setUser } from "../redux/authSlice";
import { Dumbbell } from "lucide-react";
import "../Login/Login.css"; // 👈 reuse Login CSS

const SignIn = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",
    userType: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [timer, setTimer] = useState(120);

  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- HELPERS ---------------- */
  const handleChange = (e) =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const showAlert = (msg, type) => {
    setAlert(msg);
    setAlertType(type);
    setTimeout(() => {
      setAlert("");
      setAlertType("");
    }, 1500);
  };

  /* ---------------- OTP TIMER ---------------- */
  useEffect(() => {
    if (!otpSent || otpVerified) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) setOtpExpired(true);

    return () => clearInterval(interval);
  }, [otpSent, timer, otpVerified]);

  /* ---------------- REQUEST OTP ---------------- */
  const requestOtp = async () => {
    if (!emailRegex.test(values.email)) {
      showAlert("Enter a valid email", "error");
      return;
    }

    if (!passwordRegex.test(values.password)) {
      showAlert(
        "Password must include uppercase, lowercase, number & special char",
        "error",
      );
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/send-otp", {
        email: values.email,
      });

      showAlert("OTP sent successfully", "success");
      setOtpSent(true);
      setTimer(120);
    } catch (err) {
      showAlert(err.response?.data?.message || "OTP failed", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- VERIFY OTP ---------------- */
  const verifyOtp = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/verify-otp", {
        email: values.email,
        otp: values.otp,
      });

      showAlert("OTP verified", "success");
      setOtpVerified(true);
    } catch {
      showAlert("Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- REGISTER ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpVerified) {
      showAlert("Verify OTP first", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3001/api/signIn",
        {
          username: values.username,
          email: values.email,
          password: values.password,
          userType: Number(values.userType),
        },
        { withCredentials: true },
      );

      showAlert(res.data.message, "success");

      dispatch(setUser(res.data.user));
      queryClient.invalidateQueries(["me"]);

      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      showAlert(err.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background */}
      <div className="login-bg">
        <div className="login-bg-decoration-1" />
        <div className="login-bg-decoration-2" />
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-back">
            <Link to="/">← Back to home</Link>
          </div>

          <div className="login-card-header">
            <Link to="/" className="login-logo-link">
              <Dumbbell className="login-logo-icon" />
              <span className="login-logo-text">FitTrack Sign Up</span>
            </Link>
          </div>

          {alert && <div className={`alert ${alertType}`}>{alert}</div>}

          <div className="login-card-content">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-input"
                  placeholder="Your name"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  name="email"
                  className="form-input"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  name="userType"
                  className="form-input"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select role</option>
                  <option value="1">Member</option>
                  <option value="2">Trainer</option>
                </select>
              </div>

              <div className="otp">
                <label>Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter here"
                  value={values.otp}
                  onChange={handleChange}
                  className="otpEnter"
                />
                <div className="verify">
                  <button
                    type="button"
                    onClick={otpSent && timer > 0 ? verifyOtp : requestOtp}
                    className="login-submit-btn"
                  >
                    {loading
                      ? "Loading..."
                      : otpSent && timer > 0
                        ? "Verify"
                        : "Request"}
                  </button>
                </div>
              </div>

              {!otpVerified && otpSent && !otpExpired && (
                <div className="otp-timer">
                  Time Remaining: {Math.floor(timer / 60)}:
                  {String(timer % 60).padStart(2, "0")}
                </div>
              )}

              <button
                type="submit"
                className="login-submit-btn adjust"
                disabled={loading}
              >
                Create Account
              </button>
            </form>

            <div className="login-signup">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="login-signup-link">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
