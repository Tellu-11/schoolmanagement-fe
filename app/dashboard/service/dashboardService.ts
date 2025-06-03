import { apiCall } from "@/config/apiCall";

const getAllUsers = async () => {
  try {
    // Extract the token from cookies
    const token = document.cookie.match(/token=([^;]+)/)?.[1];

    if (!token) {
      throw new Error("Unauthorized access. Please login first.");
    }

    const response = await apiCall.getRequest("/users", token);
    console.log("Fetched all users:", response);

    var users = response.data;
    console.log("Users data:", users);

    var data = users.map((user: any) => ({
      nip: user.nip,
      name: user.name,
      roleName: user.roles.name,
      isActive: user.isActive ? "Yes" : "No",
      createdBy: user.createdBy.name,
      updatedBy: user.updatedBy.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    return data;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Unauthorized")) {
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }

    console.log("Failed to get all users:", error);
    throw error;
  }
};

export { getAllUsers };
