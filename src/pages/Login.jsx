import { useContext, useState } from "react";
import { AuthContext } from "./../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../config/userAPI";

function Login() {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const foundUser = await loginUser(username, password, role);
    if (!foundUser) {
      alert("Sai tài khoản hoặc mật khẩu!");
      return;
    }
    login(foundUser);

    if (foundUser.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      {/* CARD */}
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#000000",
          }}
        >
          Tạp hóa abc
        </h2>

        {/* ROLE */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setRole("user")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              background: role === "user" ? "#000000" : "#ddd",
              color: role === "user" ? "white" : "black",
              cursor: "pointer",
            }}
          >
            User
          </button>

          <button
            onClick={() => setRole("admin")}
            style={{
              flex: 1,
              padding: "10px",
              border: "none",
              borderRadius: "10px",
              background: role === "admin" ? "#000000" : "#ddd",
              color: role === "admin" ? "white" : "black",
              cursor: "pointer",
            }}
          >
            Admin
          </button>
        </div>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
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
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "#000000",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Đăng nhập
        </button>

        {/* REGISTER */}
        {role === "user" && (
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
            }}
          >
            Chưa có tài khoản?
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#000000",
                marginLeft: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Đăng ký
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
export default Login;
