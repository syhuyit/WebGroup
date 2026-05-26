import { useEffect, useState } from "react";
import { getUsers, updateUser } from "../../config/userAPI";
import { Button, Table } from "react-bootstrap";

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
    <div>
      <h2>Quản lý người dùng</h2>
      <Table bordered striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>#{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.active}</td>
              <td>
                {user.role !== "admin" && (
                  <Button
                    variant={user.active === "true" ? "danger" : "success"}
                    onClick={() =>
                      user.active === "true"
                        ? handleLock(user)
                        : handleUnlock(user)
                    }
                  >
                    {user.active === "true" ? "LOCK" : "UNLOCK"}
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Users;
