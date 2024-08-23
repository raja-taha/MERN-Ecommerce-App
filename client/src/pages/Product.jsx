import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <div className="max-w-2xl mx-auto">
        {product && (
          <div>
            <img
              src={product.image.url}
              alt={product.name}
              className="w-full h-64 object-cover mb-4 rounded-md"
            />
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-semibold text-green-500 mb-4">
              ${product.price}
            </p>
            <button className="bg-button text-text px-4 py-2 rounded-md">
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
