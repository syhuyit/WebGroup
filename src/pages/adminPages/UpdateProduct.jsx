import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../config/productAPI";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";

function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    sales: "",
    image: "",
  });
  const navigate = useNavigate();

  const loadPBI = async () => {
    const res = await getProductById(id);
    setProduct(res);
  };

  useEffect(() => {
    loadPBI();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...product,
        price: Number(product.price),
        sales: Number(product.sales),
      };
      await updateProduct(id, productData);
      navigate("/dashboard");
      window.alert("Sửa sản phẩm thành công");
    } catch (error) {
      console.log(error);
      window.alert("Sửa sản phẩm thất bại");
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
            ← Hủy
          </Button>
          <h2 className="fw-bold m-0 text-uppercase tracking-wider text-warning fs-3">
            Cập nhật sản phẩm
          </h2>
        </div>

        <Card className="bg-dark border border-secondary text-light p-4 shadow">
          <Card.Body className="p-0">
            <Form onSubmit={handleUpdate}>
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
                  placeholder="Nhập tên..."
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
                  placeholder="Nhập loại..."
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
                      Lượt bán
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="sales"
                      value={product.sales}
                      onChange={handleChange}
                      placeholder="Nhập lượt bán..."
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
                  placeholder="Đường dẫn ảnh URL..."
                  className="bg-dark text-light border-secondary"
                />
              </Form.Group>

              <div className="d-grid mt-4">
                <Button
                  variant="warning"
                  type="submit"
                  className="fw-bold py-2 text-dark"
                >
                  Lưu thay đổi
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UpdateProduct;
