import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">Chat App</h1>
      <Link to="/users" className="bg-blue-500 px-4 py-2 rounded">
        Find Users
      </Link>
    </nav>
  );
}

export default Navbar;
