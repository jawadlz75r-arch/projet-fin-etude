import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import SalonDetails from "./pages/SalonDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelect from "./pages/RoleSelect";
import ReservationPage from "./pages/ReservationPage";
import Confirmation from "./pages/Confirmation";
import Dashboard from "./pages/Dashboard";
import ClientDashboard from "./pages/ClientDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import CoiffeurDashboard from "./pages/CoiffeurDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/salon/:id" element={<SalonDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/role-select" element={<RoleSelect />} />

          {/* Protected - need login */}
          <Route path="/reservation" element={
            <ProtectedRoute><ReservationPage /></ProtectedRoute>
          } />
          <Route path="/confirmation" element={
            <ProtectedRoute><Confirmation /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/client" element={
            <ProtectedRoute><ClientDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/owner" element={
            <ProtectedRoute><OwnerDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/coiffeur" element={
            <ProtectedRoute><CoiffeurDashboard /></ProtectedRoute>
          } />
          <Route path="/dashboard/admin" element={
            <ProtectedRoute><AdminDashboard /></ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;