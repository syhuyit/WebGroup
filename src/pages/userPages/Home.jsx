import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Home.css";

function Home() {
  const navigate = useNavigate();
  const [saleProducts, setSaleProducts] = useState([]);

  // Lấy sản phẩm từ database.json
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9999/products");
        const data = await response.json();
        // Lấy 4 sản phẩm bán chạy nhất làm sale
        const sorted = data.sort((a, b) => b.sales - a.sales).slice(0, 4);
        setSaleProducts(sorted);
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
      }
    };
    fetchProducts();
  }, []);

  const vouchers = [
    {
      id: 1,
      emoji: "🎁",
      title: "Giảm 10K",
      desc: "Cho đơn từ 100K",
      color: "#ff6b6b",
      bg: "#fff5f5",
    },
    {
      id: 2,
      emoji: "🚚",
      title: "Freeship",
      desc: "Cho đơn từ 200K",
      color: "#56B6C6",
      bg: "#f0fbfc",
    },
    {
      id: 3,
      emoji: "💎",
      title: "Giảm 5%",
      desc: "Cho thành viên VIP",
      color: "#a855f7",
      bg: "#faf5ff",
    },
  ];

  return (
    <div className="home-container">

      {/* BANNER */}
      <div className="banner">
        🛒 Tạp Hóa Nhà Mình
      </div>

      {/* SLOGAN */}
      <div className="slogan-section">
        <h2>Tiện lợi mỗi ngày</h2>
        <p>Mua sắm hàng tạp hóa thiết yếu với giá cả phải chăng, giao hàng nhanh chóng</p>
        <button className="btn-buy" onClick={() => navigate("/menu")}>
          Mua ngay
        </button>
      </div>

      {/* VOUCHER */}
      <section className="voucher-section">
        <h2 className="section-title">🎁 Voucher Ưu Đãi</h2>
        <div className="voucher-list">
          {vouchers.map((v) => (
            <div
              key={v.id}
              className="voucher-card"
              style={{ backgroundColor: v.bg, borderLeft: `5px solid ${v.color}` }}
            >
              <div className="voucher-emoji">{v.emoji}</div>
              <div className="voucher-info">
                <p className="voucher-title" style={{ color: v.color }}>{v.title}</p>
                <p className="voucher-desc">{v.desc}</p>
              </div>
              <button
                className="voucher-btn"
                style={{ backgroundColor: v.color }}
              >
                Dùng ngay
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SẢN PHẨM SALE */}
      <section className="sale-section">
        <h2 className="section-title">🔥 Sản phẩm đang Sale</h2>
        <div className="product-grid">
          {saleProducts.length > 0 ? (
            saleProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="sale-badge">SALE</div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-img"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                <p className="product-name">{product.name}</p>
                <p className="product-price">
                  {product.price.toLocaleString()}đ
                </p>
                <button
                  className="buy-btn"
                  onClick={() => navigate("/menu")}
                >
                  Mua ngay
                </button>
              </div>
            ))
          ) : (
            // Placeholder nếu chưa có dữ liệu
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="product-card">
                <div className="sale-badge">SALE</div>
                <div className="product-img-placeholder">🛍️</div>
                <p className="product-name">Sản phẩm hot</p>
                <p className="product-price">---đ</p>
                <button className="buy-btn" onClick={() => navigate("/menu")}>
                  Mua ngay
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* VỀ CHÚNG TÔI */}
      <footer className="about-section">
        <h3>Về chúng tôi</h3>
        <p>
          Tạp Hóa Nhà Mình cung cấp đầy đủ các mặt hàng thiết yếu từ nước
          giải khát, mì tôm, bánh kẹo đến gia vị — chất lượng đảm bảo, giá
          cả phải chăng, phù hợp cho mọi gia đình. 🛒
        </p>
      </footer>

    </div>
  );
}

export default Home;
