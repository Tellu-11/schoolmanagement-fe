import { apiCall } from "@/config/apiCall";

const register = async (
  roleId: string,
  id: string,
  name: string,
  password: string
) => {
  const payload = {
    roleId: roleId === "lecturer" ? 2 : 3,
    nip: id,
    name: name,
    password: password,
  };

  const response = await apiCall.postRequest("/auth/register", payload);

  const token = response.data?.token;
  if (!token) {
    throw new Error("Register failed: No token received");
  }

  document.cookie = `token=${token}; path=/; secure; samesite=strict`;
};

export { register };
