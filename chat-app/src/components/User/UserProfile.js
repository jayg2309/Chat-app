import React, { useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function UserProfile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }
      }
      setIsLoading(false);
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(firestore, "users", user.uid);
      await updateDoc(userRef, userData);
      alert("Profile updated successfully!");
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        disabled
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
      />
      <input
        type="tel"
        name="phoneNumber"
        value={userData.phoneNumber}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
      />
      <select
        name="country"
        value={userData.country}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
      >
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        {/* Add more countries */}
      </select>
      <button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
      >
        Update Profile
      </button>
    </div>
  );
}

export default UserProfile;
