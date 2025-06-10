import { ApiCall } from "@/config/apiCall";

const getAllLecturers = async () => {
  try {
    // Extract the token from cookies
    const token = document.cookie.match(/token=([^;]+)/)?.[1];

    if (!token) {
      throw new Error("Unauthorized access. Please login first.");
    }

    const response = await ApiCall.getRequest("/lecturers", token);
    console.log("Fetched all lecturers:", response);

    const lecturers = response.data;

    const data = lecturers.map((lecturer: any) => ({
      nip: lecturer.nip,
      name: lecturer.name,
      roleName: lecturer.roles.name,
      isActive: lecturer.isActive ? "Yes" : "No",
      createdBy: lecturer.createdBy.name,
      updatedBy: lecturer.updatedBy.name,
      createdAt: lecturer.createdAt,
      updatedAt: lecturer.updatedAt,
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
