import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registration from "./components/Auth/Registration";
import UserProfile from "./components/User/UserProfile";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-500">Register</Link>
          <Link to="/profile" className="text-blue-500">User Profile</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
