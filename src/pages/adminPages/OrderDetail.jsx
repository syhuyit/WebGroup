import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateStatus } from "../../config/orderAPI";
import { Card, Table, Button, Spinner, Badge } from "react-bootstrap";

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
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />{" "}
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center mt-5">
        <h3>Không tìm thấy đơn hàng!</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Button
        variant="secondary"
        className="mb-3"
        onClick={() => navigate("/orders")}
      >
        ← Quay lại danh sách
      </Button>

      <h2>Chi tiết đơn hàng #{order.id}</h2>

      <div className="row mt-3">
        {/* Cột trái: Thông tin khách hàng & Thanh toán */}
        <div className="col-md-4">
          <Card className="mb-4">
            <Card.Header as="h5">Thông tin khách hàng</Card.Header>
            <Card.Body>
              <p>
                <strong>Tên khách hàng:</strong> {order.customerName}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {order.customerPhone}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {order.customerAddress}
              </p>
              <p>
                <strong>Phương thức TT:</strong> {order.paymentMethod}
              </p>
              <p>
                <strong>Ngày đặt:</strong>{" "}
                {new Date(order.orderDate).toLocaleString("vi-VN")}
              </p>
              <p>
                <strong>Trạng thái: </strong>
                <Badge bg={order.status === "pending" ? "warning" : "success"}>
                  {order.status}
                </Badge>
              </p>

              {/* Nút Giao hàng: Chỉ hiển thị nếu đơn hàng đang ở trạng thái chưa xử lý (pending) */}
              {order.status === "pending" && (
                <Button
                  variant="primary"
                  className="w-100 mt-3"
                  onClick={handleShipOrder}
                >
                  Xác nhận giao hàng
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Cột phải: Danh sách sản phẩm trong đơn hàng */}
        <div className="col-md-8">
          <Card>
            <Card.Header as="h5">Danh sách sản phẩm</Card.Header>
            <Card.Body>
              <Table responsive bordered hover>
                <thead>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items?.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                      <td>
                        <strong>{item.name}</strong> <br />
                        <small className="text-muted">
                          Danh mục: {item.category}
                        </small>
                      </td>
                      <td>{item.price.toLocaleString("vi-VN")} đ</td>
                      <td>{item.quantity}</td>
                      <td>
                        {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                      </td>
                    </tr>
                  ))}
                  <tr className="table-light">
                    <td colSpan="4" className="text-end">
                      <strong>Tổng cộng:</strong>
                    </td>
                    <td>
                      <strong className="text-danger">
                        {order.total.toLocaleString("vi-VN")} đ
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
