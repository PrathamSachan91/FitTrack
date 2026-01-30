import React, { useState, useEffect } from "react";
import "../SignIn/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Password = () => {
  const [values, setValues] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpExpired, setOtpExpired] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!otpSent || otpVerified || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setOtpExpired(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, otpVerified, timer]);

  const requestOtp = async () => {
    if (!values.email) {
      setAlert("Enter email first");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/reset/send-otp", {
        email: values.email,
      });

      setOtpSent(true);
      setOtpVerified(false);
      setOtpExpired(false);
      setTimer(120);

      setAlert("OTP sent successfully");
      setAlertType("success");
    } catch (err) {
      setAlert(err.response?.data?.message || "Failed to send OTP");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP (no delay for feedback)
  const verifyOtp = async () => {
    if (!values.otp) {
      setAlert("Enter OTP");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/reset/verify-otp", {
        email: values.email,
        otp: values.otp,
      });

      setOtpVerified(true);
      setAlert("OTP verified successfully");
      setAlertType("success");
    } catch (err) {
      setAlert(err.response?.data?.message || "Invalid OTP");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setAlert("Passwords do not match");
      setAlertType("error");
      return;
    }
    if(!otpVerified){
    setAlert("Please verify OTP");
      setAlertType("error");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:3001/api/reset/resetPassword", {
        email: values.email,
        password: values.password,
      });

      setAlert("Password reset successful");
      setAlertType("success");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setAlert(err.response?.data?.message || "Reset failed");
      setAlertType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="body">
      <div className="Register">
        <Link to="/login" className="backBtn">
          Back
        </Link>

        <h1>Reset Password</h1>

        {alert && <div className={`alert ${alertType}`}>{alert}</div>}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>New Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              required
            />
          </div>

          {otpSent && !otpVerified && (
            <div className="otp">
              <label>Enter OTP</label>
              <input
                type="text"
                name="otp"
                value={values.otp}
                onChange={handleChange}
                className="otpEnter"
              />
              <div className="verify">
              <button type="button" onClick={verifyOtp}>
                Verify OTP
              </button></div>
            </div>
          )}

          {!otpVerified && otpSent && timer > 0 && (
            <div className="otp-timer">
              Time Remaining: {Math.floor(timer / 60)}:
              {String(timer % 60).padStart(2, "0")}
            </div>
          )}

          {!otpVerified && (
            <button
              type="button"
              onClick={requestOtp}
              disabled={loading || (otpSent && !otpExpired)}
            >
              {otpSent ? "Resend OTP" : "Request OTP"}
            </button>
          )}

          <button type="submit" disabled={loading}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Password;
