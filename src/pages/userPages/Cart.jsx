import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, getTotal, updateQuantity } =
    useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div>
        <h3>Giỏ hàng</h3>
        <p>Chưa có sản phẩm nào!</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        position: "sticky",
        top: "20px",
      }}
    >
      <h3>Giỏ hàng</h3>
      {cart?.map((item) => (
        <div
          key={item.id}
          style={{
            borderBottom: "1px solid #eee",
            paddingBottom: "15px",
            marginBottom: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <div style={{ flex: 1 }}>
              <h5>{item.name}</h5>
              <p
                style={{
                  color: "#2ecc71",
                  fontWeight: "bold",
                  margin: "5px 0",
                }}
              >
                {item.price.toLocaleString("vi-VN")}đ
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "5px",
                }}
              >
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#eee",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    minWidth: "20px",
                    textAlign: "center",
                  }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "none",
                    borderRadius: "6px",
                    background: "#eee",
                    cursor: "pointer",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              marginTop: "10px",
              background: "#D4AF37",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Xóa
          </button>
        </div>
      ))}
      <div
        style={{
          marginTop: "20px",
          borderTop: "2px solid #eee",
          paddingTop: "15px",
        }}
      >
        <h4>
          Tổng tiền:{" "}
          <span style={{ color: "#2ecc71" }}>
            {getTotal().toLocaleString("vi-VN")}đ
          </span>
        </h4>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {/* CHECKOUT */}
        <button
          onClick={() => navigate("/checkout")}
          style={{
            background: "#65c656",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Thanh toán
        </button>

        {/* CLEAR CART */}
        <button
          onClick={clearCart}
          style={{
            background: "#ddd",
            color: "black",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Xóa tất cả
        </button>
      </div>
    </div>
  );
}
export default Cart;
