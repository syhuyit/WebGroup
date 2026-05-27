import { useEffect, useState } from "react";
import { getUsers, updateUser } from "../../config/userAPI";
import { Button, Table, Container, Badge, Row, Col } from "react-bootstrap";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLock = async (user) => {
    try {
      const updatedData = {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        active: "false",
      };
      await updateUser(user.id, updatedData);
      alert("Đã KHÓA người dùng");
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Lỗi!");
    }
  };

  const handleUnlock = async (user) => {
    try {
      const updatedData = {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        active: "true",
      };
      await updateUser(user.id, updatedData);
      alert("Đã MỞ KHÓA cho người dùng");
      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Lỗi!");
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <Container>
        <Row className="align-items-center mb-4 border-bottom border-secondary pb-3">
          <Col>
            <h2 className="fw-bold m-0 text-uppercase tracking-wider text-warning">
              Quản lý người dùng
            </h2>
          </Col>
          <Col xs="auto">
            <span className="badge bg-secondary fs-6">
              Tổng số tài khoản:{" "}
              <strong className="text-warning">{users.length}</strong>
            </span>
          </Col>
        </Row>

        <div className="table-responsive shadow-sm rounded">
          <Table variant="dark" hover className="m-0 align-middle">
            <thead className="table-secondary text-dark fw-bold">
              <tr>
                <th className="py-3 px-3">ID</th>
                <th className="py-3">Tên tài khoản</th>
                <th className="py-3">Vai trò (Role)</th>
                <th className="py-3">Trạng thái</th>
                <th className="py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id} className="border-secondary">
                  <td className="px-3 fw-semibold text-secondary">
                    #{user.id}
                  </td>
                  <td className="fw-medium text-light">{user.username}</td>
                  <td>
                    <Badge
                      bg={user.role === "admin" ? "danger" : "dark"}
                      className={`text-uppercase border ${user.role === "admin" ? "border-danger" : "border-secondary"}`}
                    >
                      {user.role}
                    </Badge>
                  </td>
                  <td>
                    {user.role !== "admin" && (
                      <Badge
                        bg={user.active === "true" ? "success" : "secondary"}
                        text={user.active === "true" ? "light" : "light"}
                        className="px-2 py-1"
                      >
                        {user.active === "true" ? "Đang hoạt động" : "Bị khóa"}
                      </Badge>
                    )}
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {user.role !== "admin" ? (
                        <Button
                          variant={
                            user.active === "true"
                              ? "outline-danger"
                              : "outline-success"
                          }
                          size="sm"
                          className="px-3 fw-semibold text-uppercase fs-7"
                          onClick={() =>
                            user.active === "true"
                              ? handleLock(user)
                              : handleUnlock(user)
                          }
                        >
                          {user.active === "true" ? "Khóa" : "Mở khóa"}
                        </Button>
                      ) : (
                        <span className="text-muted small italic">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default Users;
