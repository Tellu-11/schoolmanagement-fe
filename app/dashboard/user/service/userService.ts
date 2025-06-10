import { ApiCall } from "@/config/apiCall";
import { User } from "../entity/userEntity";
import { UserForm } from "../entity/userForm";

const getAllUsers = async () => {

  const token = document.cookie.match(/token=([^;]+)/)?.[1];

  if (!token) {
    throw new Error("Unauthorized access. Please login first.");
  }

  const response = await ApiCall.getRequest("/users", token);
  console.log("Fetched all users:", response);

  const users = response.data;

  const data = users.map(
    (user: any): User => ({
      id: user.id,
      nip: user.nip,
      name: user.name,
      role: user.roles,
      password: user.password,
      isActive: user.isActive,
      createdBy: user.createdBy,
      updatedBy: user.updatedBy,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  );

  return data;
};

const createUser = async (user: UserForm) => {

  const token = document.cookie.match(/token=([^;]+)/)?.[1];

  if (!token) {
    throw new Error("Unauthorized access. Please login first.");
  }

  const response = await ApiCall.postRequest("/users", user, token);
  console.log("Created user:", response);
  return response.data;

}

const updateUser = async (userId: string, user: UserForm) => {

  const token = document.cookie.match(/token=([^;]+)/)?.[1];

  if (!token) {
    throw new Error("Unauthorized access. Please login first.");
  }

  const response = await ApiCall.putRequest(`/users/${userId}`, user, token);
  console.log("Updated user:", response);
  return response.data;

}

const deleteUser = async (userId: string) => {

  const token = document.cookie.match(/token=([^;]+)/)?.[1];

  if (!token) {
    throw new Error("Unauthorized access. Please login first.");
  }

  const response = await ApiCall.deleteRequest(`/users/${userId}`, token);
  console.log("Deleted user:", response);
  return response.data;

}

const getRoles = async () => {

  const token = document.cookie.match(/token=([^;]+)/)?.[1];

  if (!token) {
    throw new Error("Unauthorized access. Please login first.");
  }

  const response = await ApiCall.getRequest("/roles", token);
  console.log("Roles:", response);
  return response.data;

}

export { getAllUsers, createUser, updateUser, deleteUser, getRoles };
