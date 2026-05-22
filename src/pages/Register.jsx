import { useState } from "react";
import { registerUser } from "../config/userAPI";
import { useNavigate } from "react-router-dom";
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Mật khẩu không khớp!");
        return;
      }
      const newUser = {
        username,
        password,
        role: "user",
      };
      await registerUser(newUser);
      navigate("/login");
    } catch (error) {
      alert("Có lỗi xảy ra!");
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          borderRadius: "20px",
          background: "white",
          boxShadow: "black",
        }}
      >
        <h2
          style={{ color: "#D4AF37", textAlign: "center", marginBottom: "8px" }}
        >
          Đăng ký tài khoản
        </h2>
        <input
          required
          type="text"
          value={username}
          placeholder="Nhập tên đăng nhập..."
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />
        <input
          required
          type="password"
          value={password}
          placeholder="Nhập mật khẩu..."
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />
        <input
          required
          type="password"
          value={confirmPassword}
          placeholder="Nhập lại mật khẩu..."
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            background: "#D4AF37",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Đăng ký
        </button>
      </div>
    </div>
  );
}
export default Register;
