import { Table, Button, Container, Row, Col } from "react-bootstrap";
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
      await deleteProduct(id);
      loadData();
    }
  };

  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <Container>
        <Row className="align-items-center mb-4 border-bottom border-secondary pb-3">
          <Col>
            <h2 className="fw-bold m-0 text-uppercase tracking-wider text-warning">
              Dashboard
            </h2>
          </Col>
          <Col xs="auto">
            <span className="badge bg-secondary fs-6">
              Tổng số lượng:{" "}
              <strong className="text-warning">{products.length}</strong> sản
              phẩm
            </span>
          </Col>
        </Row>

        <div className="table-responsive shadow-sm rounded">
          <Table
            variant="dark"
            hover
            aligned="middle"
            className="m-0 align-middle"
          >
            <thead className="table-secondary text-dark fw-bold">
              <tr>
                <th className="py-3 px-3">Mã</th>
                <th className="py-3">Ảnh</th>
                <th className="py-3">Tên sản phẩm</th>
                <th className="py-3">Loại</th>
                <th className="py-3">Giá thành</th>
                <th className="py-3">Lượt bán</th>
                <th className="py-3 text-center">Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((p) => (
                <tr key={p.id} className="border-secondary">
                  <td className="px-3 fw-semibold text-secondary">#{p.id}</td>
                  <td>
                    <img
                      src={p.image}
                      alt={p.name}
                      width={50}
                      height={50}
                      className="rounded object-fit-cover border border-secondary"
                    />
                  </td>
                  <td className="fw-medium text-light">{p.name}</td>
                  <td>
                    <span className="badge bg-dark border border-secondary text-light">
                      {p.category}
                    </span>
                  </td>
                  <td className="text-warning fw-semibold">{p.price}</td>
                  <td>{p.sales}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/update/${p.id}`}>
                        <Button
                          variant="outline-warning"
                          size="sm"
                          className="px-3"
                        >
                          Sửa
                        </Button>
                      </Link>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="px-3"
                        onClick={() => handleDelete(p.id)}
                      >
                        Xóa
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default Dashboard;
