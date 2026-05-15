import { Table, Button, Container } from "react-bootstrap";
import { getProducts, deleteProduct } from "../../config/productAPI";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);

  const loadData = async () => {
    const res = await getProducts();
    setProducts(res);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
      deleteProduct(id);
      loadData();
    }
  };

  return (
    <Container>
      <h2>Dashboard</h2>
      <p>{products.length} (sản phẩm)</p>

      <Link to={"/add"}>
        <Button>Add Product</Button>
      </Link>

      <Table bordered striped hover>
        <thead>
          <th>Mã</th>
          <th>Ảnh</th>
          <th>Tên</th>
          <th>Loại</th>
          <th>Giá</th>
          <th>Lượt bán</th>
          <th>Chức năng</th>
        </thead>
        <tbody>
          {products?.map((p) => (
            <tr key={p.id}>
              <td>#{p.id}</td>
              <td>
                <img src={p.image} alt="" />
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price}</td>
              <td>{p.sales}</td>
              <td>
                <Link to={`/update/${p.id}`}>
                  <Button variant="warning">Sửa</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(p.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export default Dashboard;
