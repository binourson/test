import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api.js";

// The product LIST page (this is the logic that used to live in App.jsx).
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <p>Loading products…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="shop">
      <h1>My Shop</h1>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {/* Link navigates to the detail page WITHOUT reloading */}
              <Link to={`/products/${product._id}`}>
                <strong>{product.name}</strong> — {product.price} €
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductsPage;
