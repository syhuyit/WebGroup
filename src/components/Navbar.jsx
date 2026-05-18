import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  // CONTEXT
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "#111111",
        padding: "15px 35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        position: "relative",
        borderBottom: "1px solid #222222",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {/* LOGO*/}
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: "1.1",
            }}
          >
            <h2
              style={{
                color: "#D4AF37",
                margin: 0,
                fontWeight: "800",
                letterSpacing: "1px",
                fontSize: "24px",
              }}
            >
              OMNI
            </h2>
            <span
              style={{
                color: "#A99260",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "3px",
                textAlign: "center",
                paddingLeft: "2px",
              }}
            >
              — MART —
            </span>
          </div>
        </NavLink>

        {/* MENU */}
        <NavLink
          to="/menu"
          style={{
            textDecoration: "none",
            color: "#FFFFFF",
            fontWeight: "500",
            fontSize: "16px",
            opacity: 0.85,
            transition: "0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.color = "#D4AF37";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.85";
            e.currentTarget.style.color = "#FFFFFF";
          }}
        >
          Menu
        </NavLink>
      </div>

      {/* CENTER */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.18)",
            padding: "8px 18px",
            borderRadius: "999px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backdropFilter: "blur(5px)",
          }}
        >
          <span style={{ fontSize: "16px" }}>👋</span>
          <span
            style={{
              color: "#FFFFFF",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Xin chào,{" "}
            <span style={{ color: "#D4AF37", fontWeight: "600" }}>
              {user?.username}
            </span>
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <button
        onClick={handleLogout}
        style={{
          background: "transparent",
          color: "#FFFFFF",
          border: "1px solid rgba(255,255,255,0.3)",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "500",
          fontSize: "14px",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#FFFFFF";
          e.currentTarget.style.color = "#111111";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#FFFFFF";
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
}

export default Navbar;
