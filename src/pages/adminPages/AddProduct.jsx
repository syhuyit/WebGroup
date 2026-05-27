import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../config/productAPI";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    sales: 0,
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...product,
        price: Number(product.price),
        sales: Number(product.sales),
      };
      await addProduct(productData);
      window.alert("Thêm sản phẩm thành công");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      window.alert("Thêm sản phẩm thất bại");
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <Container style={{ maxWidth: "600px" }}>
        <div className="d-flex align-items-center mb-4 border-bottom border-secondary pb-3">
          <Button
            variant="outline-secondary"
            size="sm"
            className="me-3 px-3 text-light"
            onClick={() => navigate("/dashboard")}
          >
            ← Quay lại
          </Button>
          <h2 className="fw-bold m-0 text-uppercase tracking-wider text-warning fs-3">
            Thêm sản phẩm mới
          </h2>
        </div>

        <Card className="bg-dark border border-secondary text-light p-4 shadow">
          <Card.Body className="p-0">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-secondary small">
                  Tên sản phẩm
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm..."
                  className="bg-dark text-light border-secondary"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold text-secondary small">
                  Loại sản phẩm
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="Ví dụ: Điện thoại, Laptop..."
                  className="bg-dark text-light border-secondary"
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-secondary small">
                      Giá thành
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                      placeholder="Nhập giá..."
                      className="bg-dark text-light border-secondary"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-secondary small">
                      Lượt bán ban đầu
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="sales"
                      value={product.sales}
                      onChange={handleChange}
                      placeholder="Nhập số lượt bán..."
                      className="bg-dark text-light border-secondary"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold text-secondary small">
                  Đường dẫn ảnh URL
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.png"
                  className="bg-dark text-light border-secondary"
                />
              </Form.Group>

              <div className="d-grid mt-4">
                <Button
                  variant="warning"
                  type="submit"
                  className="fw-bold py-2 text-dark"
                >
                  Xác nhận thêm sản phẩm
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default AddProduct;
