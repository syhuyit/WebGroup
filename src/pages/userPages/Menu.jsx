import { useEffect, useState } from "react";
import { getProducts } from "../../config/productAPI";
import Card from "../../components/Card";

function Menu() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "25px",
      }}
    >
      {products?.map((item) => (
        <Card key={item.id} product={item} />
      ))}
    </div>
  );
}
export default Menu;
