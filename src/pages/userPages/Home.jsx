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
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1400') center/cover no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "45px",
          fontWeight: "bold",
          textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
          letterSpacing: "2px",
        }}
      >
        🛒 Tạp Hóa Nhà Mình
      </div>

      {/* Slogan */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 20px",
          background: "#ffffff",
          animation: "fadeIn 1s ease-in",
        }}
      >
        <h2>Tiện lợi mỗi ngày</h2>
        <p>
          Mua sắm hàng tạp hóa thiết yếu với giá cả phải chăng, giao hàng nhanh
          chóng
        </p>
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
          background: "#e8f7f8",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h3>Về chúng tôi</h3>
        <p>
          Tạp Hóa Nhà Mình — nơi bạn tìm thấy mọi thứ cần thiết cho cuộc sống
          hàng ngày. Từ nước giải khát, mì tôm, bánh kẹo đến gia vị và thực phẩm
          thiết yếu, tất cả đều được chọn lọc kỹ càng với chất lượng đảm bảo và
          giá cả phải chăng. Mua sắm dễ dàng, giao hàng nhanh chóng — chúng tôi
          luôn ở đây để phục vụ bạn mỗi ngày! 🛒
        </p>
      </div>
    </div>
  );
}

export default Home;
