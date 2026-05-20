import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

function Checkout() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bank, setBank] = useState("");

  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrder = async (e) => {
    e.preventDefault(); 

    if (!name || !phone || !address || !bank) {
      alert("Vui lòng điền đầy đủ thông tin để nhận hàng bạn nhé!");
      return;
    }

    const orderData = {
      userId: user?.id,
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      paymentMethod: bank,
      items: cart,
      total: totalAmount,
      status: "pending",
      orderDate: new Date().toISOString()
    };

    try {
      const response = await fetch("http://localhost:9999/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        alert("🎉 Đặt hàng thành công! Cảm ơn bạn đã ủng hộ.");
        clearCart();
        navigate("/");
      } else {
        alert("Có lỗi xảy ra khi gửi đơn hàng, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi fetch:", error);
      alert("Không thể kết nối đến máy chủ (JSON-Server)!");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "25px", border: "1px solid #ddd", borderRadius: "15px", backgroundColor: "#fff" }}>
      <h2 style={{ textAlign: "center", color: "#FF7F9C" }}>🛒 XÁC NHẬN THANH TOÁN</h2>
      
      <form onSubmit={handleOrder} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        
        <div>
          <label>Họ và tên người nhận:</label>
          <input 
            type="text" 
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label>Số điện thoại:</label>
          <input 
            type="tel" 
            placeholder="Số điện thoại liên hệ"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label>Địa chỉ nhận hàng:</label>
          <textarea 
            placeholder="Số nhà, tên đường, phường/xã..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", height: "80px" }}
          />
        </div>

        <div>
           <label>Phương thức thanh toán:</label>
           <select 
             value={bank} 
             onChange={(e) => setBank(e.target.value)}
             style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
           >
           <option value="">-- Chọn phương thức --</option>
           <option value="COD">💵 Thanh toán khi nhận hàng (COD)</option>
           <option value="Chuyển khoản ngân hàng">🏦 Thanh toán qua ngân hàng</option>
          </select>
    
           {bank === "Chuyển khoản ngân hàng" && (
           <select
             onChange={(e) => setBank(e.target.value)}
             style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginTop: "10px" }}
    >
           <option value="">-- Chọn ngân hàng --</option>
           <option value="Vietinbank">🏦 Vietinbank</option>
           <option value="Vietcombank">🏦 Vietcombank</option>
           <option value="Agribank">🏦 Agribank</option>
          </select>
    )}
        </div>
       
        <div style={{ padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "10px", marginTop: "10px" }}>
          <h3 style={{ margin: 0 }}>Tổng cộng: {totalAmount.toLocaleString()} VNĐ</h3>
        </div>

        <button 
          type="submit" 
          style={{ padding: "15px", backgroundColor: "#FF7F9C", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer", fontSize: "16px" }}
        >
          XÁC NHẬN ĐẶT HÀNG
        </button>
      </form>
    </div>
  );
}

export default Checkout;