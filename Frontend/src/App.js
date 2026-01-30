import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Component/Static";
import Home from "./Component/Landing/Landing";
import Login from "./Component/Login/Login";
import SignIn from "./Component/SignIn/SignIn";
import ResetPassword from "./Component/Reset/Password";
import AuthPublicRoute from "./Component/Protected/Auth";

import DashboardRedirect from "./Component/Redirect/DashboardRedirect";
import RegisterRedirect from "./Component/Redirect/RegisterRedirect";

import DashboardProtectedRoute from "./Component/Protected/Dashboard";
import RegisterProtectedRoute from "./Component/Protected/Register";

import AdminDashboard from "./Component/Dashboard/DashBoard";
import SubAdminDashboard from "./Component/Dashboard/SubAdminDashboard";
import StudentDashboard from "./Component/Dashboard/Student";
import TrainerDashboard from "./Component/Dashboard/Trainer";

import StudentRegister from "./Component/Register/Student";
import TrainerRegister from "./Component/Register/Trainer";
import "./Component/theme.css"

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* ---------- PUBLIC ---------- */}
        <Route element={<AuthPublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Route>

        {/* ---------- LAYOUT ---------- */}
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />

          {/* ---------- SMART REDIRECTS ---------- */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/register" element={<RegisterRedirect />} />

          {/* ---------- ADMIN ---------- */}
          <Route element={<DashboardProtectedRoute allowedRoles={[3]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* ---------- SUB ADMIN ---------- */}
          <Route element={<DashboardProtectedRoute allowedRoles={[2]} />}>
            <Route path="/subadmin/dashboard" element={<SubAdminDashboard />} />
          </Route>

          {/* ---------- STUDENT ---------- */}
          <Route element={<DashboardProtectedRoute allowedRoles={[1]} />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />

            <Route element={<RegisterProtectedRoute />}>
              <Route path="/student/register" element={<StudentRegister />} />
            </Route>
          </Route>

          {/* ---------- TRAINER ---------- */}
          <Route element={<DashboardProtectedRoute allowedRoles={[2]} />}>
            <Route path="/trainer/dashboard" element={<TrainerDashboard />} />

            <Route element={<RegisterProtectedRoute />}>
              <Route path="/trainer/register" element={<TrainerRegister />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
