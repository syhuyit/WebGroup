import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../config/orderAPI";
import {
  Table,
  Button,
  Badge,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";

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
    <div className="bg-dark text-light min-vh-100 py-5">
      <Container>
        <Row className="align-items-center mb-4 border-bottom border-secondary pb-3">
          <Col md={8}>
            <h2 className="fw-bold m-0 text-uppercase tracking-wider text-warning">
              Đơn hàng của khách
            </h2>
          </Col>
          <Col md={4} className="mt-3 mt-md-0">
            <Form.Group
              controlId="filterSelect"
              className="d-flex align-items-center gap-2 justify-content-md-end"
            >
              <Form.Label className="fw-semibold text-secondary small m-0 text-nowrap">
                Lọc:
              </Form.Label>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-dark text-light border-secondary"
                style={{ maxWidth: "230px" }}
              >
                <option value="all">Tất cả đơn hàng</option>
                <option value="pending">Chưa giao (Pending)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <div className="table-responsive shadow-sm rounded">
          <Table variant="dark" hover className="m-0 align-middle">
            <thead className="table-secondary text-dark fw-bold">
              <tr>
                <th className="py-3 px-3">Mã đơn</th>
                <th className="py-3">Mã khách hàng</th>
                <th className="py-3">Ngày đặt</th>
                <th className="py-3">Tổng tiền</th>
                <th className="py-3">Trạng thái</th>
                <th className="py-3 text-center">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order) => (
                <tr key={order.id} className="border-secondary">
                  <td className="px-3 fw-semibold text-secondary">
                    #{order.id}
                  </td>
                  <td className="text-secondary">#{order.userId}</td>
                  <td>{order.orderDate}</td>
                  <td className="text-warning fw-semibold">{order.total}</td>
                  <td>
                    <Badge
                      bg={
                        order.status === "pending"
                          ? "warning"
                          : order.status === "delivered"
                            ? "success"
                            : "danger"
                      }
                      text={order.status === "pending" ? "dark" : "light"}
                      className="px-2 py-1.5 text-uppercase fs-7"
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <Link to={`/detail/${order.id}`}>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="px-3"
                        >
                          Chi tiết đơn hàng
                        </Button>
                      </Link>
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

export default Orders;
