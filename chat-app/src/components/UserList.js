// Desc: Component to display a list of users and allow the current user to start a chat with them

import React, { useEffect, useState } from "react";
import { firestore, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "users"));
        const usersList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((user) => user.id !== currentUser?.uid); // Exclude self

        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <ul>
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="p-4 border-b flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">{user.country}</p>
              </div>
              <button
                onClick={() => navigate(`/chat/${user.id}`)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Chat
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </ul>
    </div>
  );
}

export default UserList;
