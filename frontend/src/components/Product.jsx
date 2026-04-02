import React, { useEffect, useState } from "react";
import productService from "../services/productService";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoading(true);
        setError("");

        // Load a small set of products for the simple showcase section
        const result = await productService.getProducts({ limit: 9 });
        if (result.success && Array.isArray(result.products)) {
          setProducts(result.products);
        } else {
          setError(result.message || "Failed to load products");
        }
      } catch (err) {
        console.error("Simple products load error:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  const handleImgError = (e) => {
    e.currentTarget.classList.add("hidden");
    e.currentTarget.onerror = null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
          Our Products
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          Discover our range of premium brass products powered by live data
        </p>

        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}

        {error && !loading && (
          <p className="text-center text-red-600 mb-6">{error}</p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  onError={handleImgError}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold text-red-700 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {product.description}
                  </p>
                  {typeof product.price === "number" && (
                    <p className="text-blue-700 font-bold mb-4">
                      ₹{product.price.toFixed(0)}
                    </p>
                  )}
                  <span className="inline-block mt-auto text-sm text-gray-500">
                    Category: {product.category}
                  </span>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No products available yet. Try seeding or adding products.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
