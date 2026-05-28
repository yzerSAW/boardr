export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const login = (user: any) => {
  localStorage.setItem("user", JSON.stringify(user));
};