import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);

  const fetchPBI = async (id) => {};

  return (
    <div>
      <h2>hehehehehe</h2>
    </div>
  );
}
export default ProductDetail;
