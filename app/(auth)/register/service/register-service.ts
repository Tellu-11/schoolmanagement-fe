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

  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registrasi gagal");
  }

  return response.json();
};

export { register };
