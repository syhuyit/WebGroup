import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../config/productAPI";
import { CartContext } from "../../context/CartContext";
import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        if (data) {
          setProduct(data);
        } else {
          setError("Không tìm thấy sản phẩm");
        }
      } catch (err) {
        console.error(err);
        setError("Đã xảy ra lỗi khi tải thông tin sản phẩm");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (val) => {
    const q = parseInt(val, 10);
    if (!isNaN(q) && q > 0) {
      setQuantity(q);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      window.alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center">
          <Spinner animation="border" variant="warning" style={{ width: "3rem", height: "3rem" }} />
          <p className="mt-3 text-muted">Đang tải thông tin sản phẩm...</p>
        </div>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-danger max-width-md mx-auto p-5 rounded-4 shadow-sm">
          <h3 className="mb-3">⚠️ Lỗi</h3>
          <p className="mb-4">{error || "Sản phẩm không tồn tại."}</p>
          <Button variant="dark" onClick={() => navigate("/menu")}>
            Quay lại Thực đơn
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
      {/* Nút quay lại */}
      <Button
        variant="link"
        onClick={() => navigate("/menu")}
        className="text-decoration-none text-dark fw-bold mb-4 p-0 d-inline-flex align-items-center"
        style={{ transition: "transform 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(-5px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="me-2"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Quay lại thực đơn
      </Button>

      {/* Chi tiết sản phẩm */}
      <Row className="g-5 bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
        {/* Cột ảnh sản phẩm */}
        <Col lg={6} className="d-flex justify-content-center align-items-center">
          <div
            style={{
              overflow: "hidden",
              borderRadius: "20px",
              boxShadow: "0 15px 35px rgba(0, 0, 0, 0.08)",
              border: "1px solid #f0f0f0",
              width: "100%",
              maxWidth: "500px",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "450px",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </Col>

        {/* Cột thông tin sản phẩm */}
        <Col lg={6} className="d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Badge
                bg="warning"
                className="text-dark px-3 py-2 rounded-pill fw-bold"
                style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.5px" }}
              >
                {product.category}
              </Badge>
              <span className="text-muted small">Mã SP: #{product.id}</span>
            </div>

            <h1 className="fw-extrabold text-dark mb-3" style={{ fontSize: "36px", letterSpacing: "-0.5px" }}>
              {product.name}
            </h1>

            <div className="d-flex align-items-baseline gap-3 mb-4">
              <span className="fs-2 fw-bold text-success">
                {product.price?.toLocaleString("vi-VN")}đ
              </span>
              <span className="text-secondary fs-6">
                | {product.sales} lượt bán
              </span>
            </div>

            <hr className="my-4" style={{ borderColor: "#eee" }} />

            {/* Mô tả sản phẩm */}
            <div className="mb-4">
              <h5 className="fw-bold text-dark mb-3">Mô tả sản phẩm</h5>
              <p
                style={{
                  fontSize: "16px",
                  color: "#555",
                  lineHeight: "1.7",
                  whiteSpace: "pre-line",
                }}
              >
                {product.description || "Chưa có thông tin mô tả chi tiết cho sản phẩm này."}
              </p>
            </div>
          </div>

          <div>
            <hr className="my-4" style={{ borderColor: "#eee" }} />

            {/* Mua hàng */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              {/* Bộ chọn số lượng */}
              <div className="d-flex align-items-center border rounded-pill p-1" style={{ background: "#f8f9fa" }}>
                <Button
                  variant="link"
                  className="text-dark text-decoration-none fw-bold px-3 py-1"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  style={{ fontSize: "18px" }}
                >
                  -
                </Button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  style={{
                    width: "40px",
                    border: "none",
                    background: "transparent",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "16px",
                    outline: "none",
                  }}
                />
                <Button
                  variant="link"
                  className="text-dark text-decoration-none fw-bold px-3 py-1"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ fontSize: "18px" }}
                >
                  +
                </Button>
              </div>

              {/* Nút Thêm vào giỏ */}
              <Button
                onClick={handleAddToCart}
                style={{
                  background: "#111111",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "30px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  transition: "all 0.2s ease",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#D4AF37";
                  e.currentTarget.style.color = "#111111";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#111111";
                  e.currentTarget.style.color = "#ffffff";
                }}
                className="flex-grow-1 flex-md-grow-0"
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
