import API from "./api";

export const loginUser = async (username, password, role) => {
  const res = await API.get("/users");
  const users = res.data;

  const foundUser = users.find(
    (user) =>
      user.username === username &&
      user.password === password &&
      user.role === role,
  );
  return foundUser;
};

export const registerUser = async (newUser) => {
  const res = await API.post("/users", newUser);
  return res.data;
};
