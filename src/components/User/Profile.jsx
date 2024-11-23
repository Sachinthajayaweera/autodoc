import React, { useState } from "react";

const Profile = ({ user, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState({ name: "", email: "" }); // Form errors

  const validateInputs = () => {
    const newError = { name: "", email: "" };
    let isValid = true;

    if (!editedName.trim()) {
      newError.name = "Name is required.";
      isValid = false;
    }

    if (!editedEmail.trim()) {
      newError.email = "Email is required.";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(editedEmail)) {
      newError.email = "Invalid email format.";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleSave = async () => {
    if (!validateInputs()) return; // Validate inputs before sending
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editedName, email: editedEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }

      const data = await response.json();
      updateUser(data.user); // Update parent state
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("An error occurred:", error.message);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete profile.");
      }

      alert("Profile deleted successfully!");
      localStorage.removeItem("token");
      window.location.reload(); // Reload or redirect to login
    } catch (error) {
      console.error("An error occurred:", error.message);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Profile</h1>
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 dark:text-white shadow-md rounded-md p-6">
        {!isEditing ? (
          <>
            {/* User Details */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">User Details</h2>
              <div className="space-y-2">
                <p>
                  <strong className="font-medium">Name:</strong> {user.name || "N/A"}
                </p>
                <p>
                  <strong className="font-medium">Email:</strong> {user.email || "N/A"}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <button
                className="bg-[#C30010] text-white px-4 py-2 rounded-md hover:bg-[#a0000d] transition-colors"
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
              >
                Edit Profile
              </button>
              <button
                className="border border-[#C30010] text-[#C30010] px-4 py-2 rounded-md hover:bg-[#C30010] hover:text-white transition-colors"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete Profile"}
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Edit Profile Form */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name:</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-[#C30010]"
                    disabled={isLoading}
                  />
                  {error.name && <p className="text-sm text-red-500">{error.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email:</label>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-[#C30010]"
                    disabled={isLoading}
                  />
                  {error.email && <p className="text-sm text-red-500">{error.email}</p>}
                </div>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-8">
              <button
                className="bg-[#C30010] text-white px-4 py-2 rounded-md hover:bg-[#a0000d] transition-colors"
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
              <button
                className="border border-[#C30010] text-[#C30010] px-4 py-2 rounded-md hover:bg-[#C30010] hover:text-white transition-colors"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
