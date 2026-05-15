import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Navbar from "./components/Navbar";
import Home from "./pages/userPages/Home";
import Menu from "./pages/userPages/Menu";
import AddProduct from "./pages/adminPages/AddProduct";
import UpdateProduct from "./pages/adminPages/UpdateProduct";
import Dashboard from "./pages/adminPages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />

          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
