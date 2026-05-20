import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../config/productAPI";
import { Form, Button } from "react-bootstrap";

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
      await updateProduct(id, product);
      navigate("/");
      window.alert("Sửa sản phẩm thành công");
    } catch (error) {
      console.log(error);
      window.alert("Sửa sản phẩm thất bại");
    }
  };

  return (
    <div>
      <Form onSubmit={handleUpdate}>
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

        <Button variant="warning" type="submit">
          Xác nhận
        </Button>
      </Form>
    </div>
  );
}
export default UpdateProduct;
