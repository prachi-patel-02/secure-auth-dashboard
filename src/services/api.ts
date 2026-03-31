const BASE_URL = "https://crud-api-5f45.onrender.com";

// SIGNUP
export const signupUser = async (user: any) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  return { res, data };
};

// GET USERS
export const getUsers = async (token: string) => {
  const res = await fetch(`${BASE_URL}/dashboard/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// CREATE USER
export const createUser = async (token: string, user: any) => {
  const res = await fetch(`${BASE_URL}/dashboard/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  return res.json();
};

// UPDATE USER
export const updateUser = async (token: string, id: string, user: any) => {
  const res = await fetch(`${BASE_URL}/dashboard/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });

  return res.json();
};

// DELETE USER
export const deleteUser = async (token: string, id: string) => {
  const res = await fetch(`${BASE_URL}/dashboard/user/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.json();
};
