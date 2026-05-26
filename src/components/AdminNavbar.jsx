import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function AdminNavbar() {
  // CONTEXT
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // LOGOUT
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Bạn có chắc chắn muốn đăng xuất không?",
    );
    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="shadow-sm mb-4 py-3"
    >
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/dashboard"
          className="fw-bold text-warning fs-4 d-flex align-items-center"
        >
          ADMIN
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="admin-navbar-nav" />

        <Navbar.Collapse id="admin-navbar-nav">
          <Nav className="me-auto ms-3 gap-2">
            <Nav.Link
              as={NavLink}
              to="/orders"
              className={({ isActive }) =>
                isActive ? "text-warning fw-bold nav-link" : "nav-link"
              }
            >
              📦 Đơn hàng
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/add"
              className={({ isActive }) =>
                isActive ? "text-warning fw-bold nav-link" : "nav-link"
              }
            >
              ➕ Thêm sản phẩm
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/users"
              className={({ isActive }) =>
                isActive ? "text-warning fw-bold nav-link" : "nav-link"
              }
            >
              Quản lý người dùng
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-3">
            {user && (
              <span className="text-light opacity-75 small">
                Xin chào,{" "}
                <strong className="text-info">
                  {user.name || "Quản trị viên"}
                </strong>
              </span>
            )}

            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLogout}
              className="px-3 fw-semibold"
            >
              👋 Đăng xuất
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
