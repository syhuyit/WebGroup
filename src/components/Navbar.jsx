import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        background: "#000000",
        padding: "15px 35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {/* Brand */}
        <NavLink
          to="/home"
          style={{
            textDecoration: "none",
          }}
        >
          <h2
            style={{
              color: "white",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            Home
          </h2>
        </NavLink>

        {/* MENU */}
        <NavLink
          to="/menu"
          style={{
            textDecoration: "none",
            color: "white",
            fontWeight: "500",
            fontSize: "25px",
          }}
        >
          Menu
        </NavLink>
      </div>
    </div>
  );
}
export default Navbar;
