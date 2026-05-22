import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../config/productAPI";
import { Form, Button } from "react-bootstrap";

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
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Tên</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Nhập tên..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Loại</Form.Label>
          <Form.Control
            required
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Nhập loại..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Giá</Form.Label>
          <Form.Control
            required
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Nhập giá..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Lượt bán</Form.Label>
          <Form.Control
            required
            type="number"
            name="sales"
            value={product.sales}
            onChange={handleChange}
            placeholder="Nhập lượt bán..."
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Ảnh URL</Form.Label>
          <Form.Control
            required
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Đường dẫn ảnh URL..."
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Xác nhận
        </Button>
      </Form>
    </div>
  );
}
export default AddProduct;
