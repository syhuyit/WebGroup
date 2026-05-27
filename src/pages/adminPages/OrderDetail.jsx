import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateStatus } from "../../config/orderAPI";
import {
  Card,
  Table,
  Button,
  Spinner,
  Badge,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const handleShipOrder = async () => {
    try {
      await updateStatus(id, { ...order, status: "delivered" });
      navigate("/orders");
      alert("Đơn hàng đã được giao!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="bg-dark text-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <Spinner animation="border" variant="warning" className="mb-3" />
        <p className="text-secondary">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="bg-dark text-light min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-danger mb-3">Không tìm thấy đơn hàng!</h3>
        <Button
          variant="outline-secondary"
          className="text-light"
          onClick={() => navigate("/orders")}
        >
          ← Quay lại danh sách
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <Container>
        <div className="d-flex align-items-center mb-4 border-bottom border-secondary pb-3">
          <Button
            variant="outline-secondary"
            className="me-3 px-3 text-light"
            size="sm"
            onClick={() => navigate("/orders")}
          >
            ← Quay lại
          </Button>
          <h2 className="fw-bold m-0 text-uppercase tracking-wider text-warning fs-3">
            Chi tiết đơn hàng #{order.id}
          </h2>
        </div>

        <Row className="g-4">
          <Col lg={4}>
            <Card className="bg-dark border border-secondary text-light shadow-sm h-100">
              <Card.Header className="border-secondary bg-secondary text-dark fw-bold py-3">
                Thông tin khách hàng
              </Card.Header>
              <Card.Body className="d-flex flex-column justify-content-between p-4">
                <div className="lh-lg">
                  <p className="mb-2">
                    <strong className="text-secondary small d-block text-uppercase">
                      Tên khách hàng
                    </strong>
                    <span className="fs-5 fw-medium">{order.customerName}</span>
                  </p>
                  <p className="mb-2">
                    <strong className="text-secondary small d-block text-uppercase">
                      Số điện thoại
                    </strong>
                    <span>{order.customerPhone}</span>
                  </p>
                  <p className="mb-2">
                    <strong className="text-secondary small d-block text-uppercase">
                      Địa chỉ giao hàng
                    </strong>
                    <span className="text-light-50">
                      {order.customerAddress}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong className="text-secondary small d-block text-uppercase">
                      Phương thức thanh toán
                    </strong>
                    <span className="badge bg-dark border border-secondary text-light px-2 py-1">
                      {order.paymentMethod}
                    </span>
                  </p>
                  <p className="mb-2">
                    <strong className="text-secondary small d-block text-uppercase">
                      Ngày đặt hàng
                    </strong>
                    <span>
                      {new Date(order.orderDate).toLocaleString("vi-VN")}
                    </span>
                  </p>
                  <p className="mb-0">
                    <strong className="text-secondary small d-block text-uppercase mb-1">
                      Trạng thái đơn hàng
                    </strong>
                    <Badge
                      bg={order.status === "pending" ? "warning" : "success"}
                      text={order.status === "pending" ? "dark" : "light"}
                      className="px-2 py-1.5 text-uppercase"
                    >
                      {order.status}
                    </Badge>
                  </p>
                </div>

                {order.status === "pending" && (
                  <Button
                    variant="warning"
                    className="w-100 mt-4 fw-bold py-2 text-dark"
                    onClick={handleShipOrder}
                  >
                    Xác nhận giao hàng
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            <Card className="bg-dark border border-secondary text-light shadow-sm h-100">
              <Card.Header className="border-secondary bg-secondary text-dark fw-bold py-3">
                Danh sách sản phẩm
              </Card.Header>
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table variant="dark" hover className="m-0 align-middle">
                    <thead className="table-dark text-secondary small text-uppercase border-bottom border-secondary">
                      <tr>
                        <th className="py-3 px-3">Hình ảnh</th>
                        <th className="py-3">Tên sản phẩm</th>
                        <th className="py-3 text-end">Đơn giá</th>
                        <th className="py-3 text-center">SL</th>
                        <th className="py-3 text-end px-3">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items?.map((item) => (
                        <tr key={item.id} className="border-secondary">
                          <td className="px-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                              className="rounded object-fit-cover border border-secondary"
                            />
                          </td>
                          <td>
                            <div className="fw-medium text-light">
                              {item.name}
                            </div>
                            <div className="text-secondary small">
                              Danh mục: {item.category}
                            </div>
                          </td>
                          <td className="text-end">
                            {item.price.toLocaleString("vi-VN")} đ
                          </td>
                          <td className="text-center text-secondary fw-semibold">
                            {item.quantity}
                          </td>
                          <td className="text-end px-3 text-light-50">
                            {(item.price * item.quantity).toLocaleString(
                              "vi-VN",
                            )}{" "}
                            đ
                          </td>
                        </tr>
                      ))}
                      <tr className="border-0 bg-dark">
                        <td
                          colSpan="4"
                          className="text-end py-4 border-0 text-secondary fw-bold text-uppercase small"
                        >
                          Tổng cộng:
                        </td>
                        <td className="text-end py-4 px-3 border-0">
                          <h4 className="text-warning fw-bold m-0">
                            {order.total.toLocaleString("vi-VN")} đ
                          </h4>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default OrderDetail;
