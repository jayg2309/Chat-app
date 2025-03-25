import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook
import { auth, firestore } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function Registration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    country: "",
  });

  const [isRegistered, setIsRegistered] = useState(false); // ✅ Track registration status
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Store additional user details in Firestore
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        country: formData.country,
        createdAt: new Date(),
      });

      console.log("User registered successfully");
      setIsRegistered(true); // ✅ Mark registration as successful
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
        />
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
        >
          <option value="">Select Country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          {/* Add more countries */}
        </select>
        <button 
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
        >
          Register
        </button>

        {/* ✅ Show "Go to Profile" button after successful registration */}
        {isRegistered && (
          <button
            onClick={() => navigate("/profile")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
          >
            Go to Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default Registration;
