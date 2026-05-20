import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../css/Card.css";

function Card({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <div
        style={{
          minHeight: "60px",
          marginBottom: "10px",
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: "22px",
          }}
        >
          {product.name}
        </h4>
      </div>
      <div
        style={{
          marginBottom: "15px",
        }}
      >
        <p
          style={{
            color: "#2ecc71",
            fontWeight: "bold",
            fontSize: "20px",
            margin: 0,
          }}
        >
          {product.price.toLocaleString("vi-VN")}đ
        </p>
        <p
          style={{
            color: "#000000",
            fontWeight: "bold",
            fontSize: "20px",
            margin: 0,
          }}
        >
          {product.sales} lượt bán
        </p>
      </div>
      <button onClick={handleAddToCart} className="add-btn">
        Thêm ngay
      </button>
    </div>
  );
}
export default Card;
