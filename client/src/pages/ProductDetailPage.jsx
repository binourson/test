import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../api.js";

// The DETAIL page: shows ONE product, based on the :id in the URL.
function ProductDetailPage() {
  const { id } = useParams(); // reads the ":id" segment from the URL

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]); // re-run if the id in the URL changes

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-detail">
      <Link to="/">← Back to products</Link>
      <h1>{product.name}</h1>
      <p>Price: {product.price} €</p>
      <p>Stock: {product.stock}</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductDetailPage;
