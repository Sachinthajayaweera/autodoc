const BASE_URL = "http://localhost:5000/api";

export const signup = async (userData) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (userData) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const getProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};

export const updateProfile = async (token, updatedData) => {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  return response.json();
};

export const deleteProfile = async (token) => {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
};
