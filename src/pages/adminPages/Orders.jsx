import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../config/orderAPI";
import { Table, Button, Badge, Form } from "react-bootstrap";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders?.filter((order) => {
    if (filterStatus === "pending") {
      return order.status === "pending";
    }
    return true;
  });

  return (
    <div>
      <h2>Đơn hàng của khách</h2>

      <div className="mb-3" style={{ width: "250px" }}>
        <Form.Group controlId="filterSelect">
          <Form.Label className="fw-bold">Bộ lọc trạng thái:</Form.Label>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả đơn hàng</option>
            <option value="pending">Đơn hàng chưa giao (Pending)</option>
          </Form.Select>
        </Form.Group>
      </div>

      <Table bordered striped hover>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>UserID</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>#{order.userId}</td>
              <td>{order.orderDate}</td>
              <td>{order.total}</td>
              <td>
                <Badge bg={order.status === "pending" ? "warning" : "success"}>
                  {order.status}
                </Badge>
              </td>
              <td>
                <Link to={`/detail/${order.id}`}>
                  <Button>Chi tiết đơn hàng</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Orders;
