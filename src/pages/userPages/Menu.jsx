import { useEffect, useState } from "react";
import { getProducts } from "../../config/productAPI";
import Card from "../../components/Card";
import Cart from "./Cart";
import "../../css/Menu.css";

function Menu() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [pricePreset, setPricePreset] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Trích xuất các danh mục duy nhất từ danh sách sản phẩm
  const categories = [
    "Tất cả",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  // Xử lý khi chọn khoảng giá định sẵn
  const handlePricePresetChange = (preset) => {
    setPricePreset(preset);
    if (preset === "all") {
      setMinPrice("");
      setMaxPrice("");
    } else if (preset === "under10") {
      setMinPrice("");
      setMaxPrice("10000");
    } else if (preset === "10to50") {
      setMinPrice("10000");
      setMaxPrice("50000");
    } else if (preset === "over50") {
      setMinPrice("50000");
      setMaxPrice("");
    }
  };

  // Xử lý khi nhập giá tự chọn
  const handleMinPriceChange = (val) => {
    setMinPrice(val);
    setPricePreset("custom");
  };

  const handleMaxPriceChange = (val) => {
    setMaxPrice(val);
    setPricePreset("custom");
  };

  // Lọc sản phẩm theo thể loại, tên tìm kiếm và khoảng giá
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Tất cả" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesMinPrice =
      minPrice === "" || product.price >= parseFloat(minPrice);
    const matchesMaxPrice =
      maxPrice === "" || product.price <= parseFloat(maxPrice);
    return matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  // Sắp xếp sản phẩm theo tên và giá cả
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "nameAsc") {
      return a.name.localeCompare(b.name, "vi");
    }
    if (sortBy === "nameDesc") {
      return b.name.localeCompare(a.name, "vi");
    }
    if (sortBy === "priceAsc") {
      return a.price - b.price;
    }
    if (sortBy === "priceDesc") {
      return b.price - a.price;
    }
    return 0;
  });

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Tất cả");
    setMinPrice("");
    setMaxPrice("");
    setPricePreset("all");
    setSortBy("default");
  };

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Phần bộ lọc và tìm kiếm */}
      <div
        className="filter-header-section"
        style={{
          marginBottom: "40px",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          border: "1px solid #f0f0f0",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Dòng tiêu đề và ô tìm kiếm */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "32px",
                  fontWeight: "800",
                  color: "#111111",
                }}
              >
                Danh Mục Sản Phẩm
              </h2>
              <p
                style={{
                  margin: "5px 0 0 0",
                  color: "#666",
                  fontSize: "14px",
                }}
              >
                Khám phá các sản phẩm chất lượng tốt nhất dành cho bạn
              </p>
            </div>

            {/* Ô tìm kiếm */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#999",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm theo tên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 40px 12px 45px",
                  fontSize: "15px",
                  borderRadius: "30px",
                  border: "1.5px solid #e0e0e0",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  background: "#fcfcfc",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#D4AF37";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(212, 175, 55, 0.15)";
                  e.target.style.background = "#fff";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                  e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
                  e.target.style.background = "#fcfcfc";
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "none",
                    color: "#999",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    fontSize: "18px",
                  }}
                  title="Xóa tìm kiếm"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          <hr style={{ margin: "10px 0", borderColor: "#f0f0f0" }} />

          {/* Danh mục thể loại */}
          <div>
            <span
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "700",
                color: "#555",
                marginBottom: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Lọc theo thể loại:
            </span>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      border: isActive ? "none" : "1px solid #e0e0e0",
                      background: isActive
                        ? "linear-gradient(135deg, #D4AF37, #A99260)"
                        : "#f8f9fa",
                      color: isActive ? "#ffffff" : "#444444",
                      boxShadow: isActive
                        ? "0 4px 10px rgba(212, 175, 55, 0.3)"
                        : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "#e9ecef";
                        e.currentTarget.style.transform = "translateY(-1.5px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "#f8f9fa";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <hr style={{ margin: "10px 0", borderColor: "#f0f0f0" }} />

          {/* Hàng lọc giá tiền và sắp xếp */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "25px",
              alignItems: "flex-start",
            }}
          >
            {/* Lọc giá */}
            <div style={{ flex: "1 1 500px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#555",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Lọc theo giá tiền:
              </span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                {/* Ô nhập giá tự chọn */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <input
                    type="number"
                    placeholder="Min (đ)"
                    min="0"
                    max="1000000"
                    step="5000"
                    value={minPrice}
                    onChange={(e) => handleMinPriceChange(e.target.value)}
                    style={{
                      width: "110px",
                      padding: "6px 12px",
                      fontSize: "13px",
                      borderRadius: "15px",
                      border: "1px solid #e0e0e0",
                      outline: "none",
                      transition: "all 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                    onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                  />
                  <span style={{ color: "#aaa", fontSize: "13px" }}>-</span>
                  <input
                    type="number"
                    placeholder="Max (đ)"
                    min="0"
                    max="1000000"
                    step="5000"
                    value={maxPrice}
                    onChange={(e) => handleMaxPriceChange(e.target.value)}
                    style={{
                      width: "110px",
                      padding: "6px 12px",
                      fontSize: "13px",
                      borderRadius: "15px",
                      border: "1px solid #e0e0e0",
                      outline: "none",
                      transition: "all 0.2s ease",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
                    onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                  />
                </div>
              </div>
            </div>

            {/* Sắp xếp */}
            <div style={{ width: "250px" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "700",
                  color: "#555",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}

              >Sắp xếp theo:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 16px",
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "15px",
                  border: "1.5px solid #e0e0e0",
                  outline: "none",
                  background: "#ffffff",
                  cursor: "pointer",
                  color: "#444444",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#D4AF37";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                }}
              >
                <option value="default">Mặc định</option>
                <option value="nameAsc">Tên: A → Z</option>
                <option value="nameDesc">Tên: Z → A</option>
                <option value="priceAsc">Giá từ Thấp đến Cao</option>
                <option value="priceDesc">Giá từ Cao đến Thấp</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bố cục chính: Danh sách sản phẩm & Giỏ hàng */}
      <div className="menu-main-layout">
        {/* Cột sản phẩm */}
        <div className="menu-products-column">
          {sortedProducts.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "25px",
              }}
            >
              {sortedProducts.map((item) => (
                <div key={item.id} className="product-item-wrapper">
                  <Card product={item} />
                </div>
              ))}
            </div>
          ) : (
            /* Không có sản phẩm nào */
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                background: "#ffffff",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                border: "1px solid #f0f0f0",
              }}
            >
              <div
                style={{
                  fontSize: "50px",
                  marginBottom: "15px",
                  color: "#aaa",
                }}
              >
                🔍
              </div>
              <h4 style={{ color: "#333", fontWeight: "700" }}>
                Không tìm thấy sản phẩm nào!
              </h4>
              <p style={{ color: "#777", fontSize: "15px", marginTop: "8px" }}>
                Không có sản phẩm nào trùng khớp với bộ lọc của bạn! 
              </p>
              <button
                onClick={handleResetFilters}
                style={{
                  marginTop: "20px",
                  background: "#111111",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 24px",
                  borderRadius: "30px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#D4AF37";
                  e.currentTarget.style.color = "#111111";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#111111";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>

        {/* Cột giỏ hàng */}
        <div className="menu-cart-sidebar">
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default Menu;
