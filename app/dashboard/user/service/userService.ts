import { ApiCall } from "@/config/apiCall";
import { User } from "../entity/userEntity";

const getAllUsers = async () => {
  try {
    // Extract the token from cookies
    const token = document.cookie.match(/token=([^;]+)/)?.[1];

    if (!token) {
      throw new Error("Unauthorized access. Please login first.");
    }

    const response = await ApiCall.getRequest("/users", token);
    console.log("Fetched all users:", response);

    const users = response.data;

    const data = users.map(
      (user: any): User => ({
        nip: user.nip,
        name: user.name,
        roleName: user.roles.name,
        isActive: user.isActive,
        createdBy: user.createdBy.name,
        updatedBy: user.updatedBy.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export { getAllUsers };
