import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import "./Register.css";

const TrainerRegistration = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    phone: "",
    gender: "",
    dateOfBirth: "",

    emergencyContactName: "",
    emergencyContactPhone: "",

    experienceYears: "",
    certifications: "",
    specializations: "",
    availability: "",
    trainingMode: "",
    bio: "",
  });

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:3001/api/trainer/register",
        formData,
        { withCredentials: true }
      );

      queryClient.invalidateQueries(["trainer-profile"]);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Trainer registration failed");
    }
  };

  return (
    <div className="enroll-page">
      <div className="enroll-card">
        <h2>Trainer Registration</h2>
        <p className="subtitle">
          Complete your profile to start training members
        </p>

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
              />
            </div>
          </div>

          {/* EMERGENCY */}
          <h4>Emergency Contact</h4>

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

          {/* PROFESSIONAL DETAILS */}
          <h4>Professional Details</h4>

          <input
            type="number"
            name="experienceYears"
            placeholder="Years of Experience"
            required
            onChange={handleChange}
          />

          <textarea
            name="certifications"
            placeholder="Certifications (e.g. ACE, NASM, ISSA)"
            required
            onChange={handleChange}
          />

          <textarea
            name="specializations"
            placeholder="Specializations (Weight Loss, Strength, Yoga, Rehab)"
            required
            onChange={handleChange}
          />

          <select name="trainingMode" required onChange={handleChange}>
            <option value="">Preferred Training Mode</option>
            <option value="Personal Training">Personal Training</option>
            <option value="Group Training">Group Training</option>
            <option value="Online Coaching">Online Coaching</option>
            <option value="Hybrid">Hybrid</option>
          </select>

          <select name="availability" required onChange={handleChange}>
            <option value="">Availability</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Full Day">Full Day</option>
          </select>

          <textarea
            name="bio"
            placeholder="Short Bio / Training Philosophy"
            onChange={handleChange}
          />

          <button type="submit" className="enroll-btn">
            Complete Trainer Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainerRegistration;
