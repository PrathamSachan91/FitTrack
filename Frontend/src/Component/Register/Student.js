import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import "./Register.css";

const PLAN_CONFIG = {
  "1 Month": { duration: 1, amount: 2000 },
  "3 Months": { duration: 3, amount: 5000 },
  "6 Months": { duration: 6, amount: 9500 },
  "12 Months": { duration: 12, amount: 15000 },
};

const StudentRegistration = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    phone: "",
    gender: "",
    dateOfBirth: "",

    emergencyContactName: "",
    emergencyContactPhone: "",
    medicalConditions: "",
    injuries: "",

    height: "",
    weight: "",

    fitnessGoal: "",
    experienceLevel: "",

    plan: "",
    startDate: "",
    duration: "",
    paymentMode: "",
    amountPaid: "",
  });

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- PLAN CHANGE ---------------- */
  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    const config = PLAN_CONFIG[selectedPlan];

    setFormData((prev) => ({
      ...prev,
      plan: selectedPlan,
      duration: config ? String(config.duration) : "",
      amountPaid: config ? String(config.amount) : "",
    }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/api/student/register", formData, {
        withCredentials: true,
      });

      queryClient.invalidateQueries(["student-membership"]);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="enroll-page">
      <div className="enroll-card">
        <h2>Student Gym Registration</h2>
        <p className="subtitle">Complete your details to join the gym</p>

        <form onSubmit={handleSubmit}>
          {/* PERSONAL INFO */}
          <h4>Personal Information</h4>

          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            required
            onChange={handleChange}
          />

          <div className="form-row two-col">
            <div className="form-field">
              <select name="gender" required onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-field">
              <input
                type="date"
                name="dateOfBirth"
                required
                onChange={handleChange}
                className="dob"
              />
            </div>
          </div>

          <h4>Emergency & Health</h4>

          <input
            type="text"
            name="emergencyContactName"
            placeholder="Emergency Contact Name"
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="emergencyContactPhone"
            placeholder="Emergency Contact Number"
            required
            onChange={handleChange}
          />

          <textarea
            name="medicalConditions"
            placeholder="Medical Conditions (Optional)"
            onChange={handleChange}
          />

          <textarea
            name="injuries"
            placeholder="Injuries / Surgeries (Optional)"
            onChange={handleChange}
          />

          {/* PHYSICAL METRICS */}
          <h4>Physical Metrics</h4>

          <div className="form-row">
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              onChange={handleChange}
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              onChange={handleChange}
            />
          </div>

          {/* FITNESS GOALS */}
          <h4>Fitness Goals</h4>

          <select name="fitnessGoal" required onChange={handleChange}>
            <option value="">Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Strength">Strength</option>
            <option value="General Fitness">General Fitness</option>
          </select>

          <select name="experienceLevel" required onChange={handleChange}>
            <option value="">Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* MEMBERSHIP */}
          <h4>Membership & Payment</h4>

          <select name="plan" required onChange={handlePlanChange}>
            <option value="">Select Membership Plan</option>
            {Object.keys(PLAN_CONFIG).map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>

          <div className="form-row">
            <input
              type="date"
              name="startDate"
              required
              onChange={handleChange}
            />

            <select name="duration" value={formData.duration} disabled>
              <option value="">Duration</option>
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
            </select>
          </div>

          <div className="form-row">
            <select name="paymentMode" required onChange={handleChange}>
              <option value="">Payment Mode</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>

            <input
              type="number"
              name="amountPaid"
              value={formData.amountPaid}
              readOnly
            />
          </div>

          <button type="submit" className="enroll-btn">
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistration;
