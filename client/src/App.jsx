import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import "./App.css";

// App is now just the ROUTER: it maps each URL path to a page component.
function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default App;
