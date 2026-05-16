import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Banner */}
      <div
        style={{
          height: "300px",
          background:
            "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(...)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        🛒 Tạp Hóa Nhà Mình
      </div>

      {/* Slogan */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          animation: "fadeIn 1s ease-in",
        }}
      >
        <h2>Tiện lợi mỗi ngày</h2>
        <p>Mua sắm hàng tạp hóa thiết yếu với giá cả phải chăng, giao hàng nhanh chóng</p>
        <button
          onClick={() => navigate("/menu")}
          style={{
            background: "#56B6C6",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Mua ngay
        </button>
      </div>

      {/* Giới thiệu */}
      <div
        style={{
          background: "#f9f9f9",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h3>Về chúng tôi</h3>
        <p>
          Tạp Hóa Nhà Mình cung cấp đầy đủ các mặt hàng thiết yếu từ nước
          giải khát, mì tôm, bánh kẹo đến gia vị — chất lượng đảm bảo, giá
          cả phải chăng, phù hợp cho mọi gia đình.
        </p>
      </div>
    </div>
  );
}

export default Home;
