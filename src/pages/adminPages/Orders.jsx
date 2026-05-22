import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../config/orderAPI";
import { Table, Button, Badge } from "react-bootstrap";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await getOrders();
    setOrders(res);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Đơn hàng của khách</h2>
      <Table bordered striped hover>
        <thead>
          <th>OrderID</th>
          <th>UserID</th>
          <th>Ngày đặt</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Chức năng</th>
        </thead>
        <tbody>
          {orders?.map((order) => (
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
