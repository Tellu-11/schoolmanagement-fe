import { ApiCall } from "@/config/apiCall";

const login = async (id: string, password: string) => {
  const payload = {
    nip: id,
    password: password,
  };

  const response = await ApiCall.postRequest("/auth/login", payload);

  const token = response.data?.token;
  if (!token) {
    throw new Error("Login failed: No token received");
  }

  document.cookie = `token=${token}; path=/; secure; samesite=strict`;
};

export { login };
