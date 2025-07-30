import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import cartService from '../services/cartService';

const Products = ({ user, isLoggedIn, onUpdateCartCount }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    page: 1
  });

  const categories = [
    'All',
    'Brass Cable Glands',
    'Electrical Components',
    'Brass Screws & Fittings',
    'Custom Parts'
  ];

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const filterParams = {
        ...filters,
        category: filters.category === 'All' ? '' : filters.category
      };
      
      const result = await productService.getProducts(filterParams);
      if (result.success) {
        setProducts(result.products);
      }
    } catch (error) {
      setError(error.message || 'Failed to load products');
      console.error('Load products error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      setAddingToCart(product._id);
      const result = await cartService.addToCart(product._id, 1);
      
      if (result.success) {
        alert(`${product.name} added to cart!`);
        if (onUpdateCartCount) {
          onUpdateCartCount();
        }
      }
    } catch (error) {
      alert(error.message || 'Failed to add item to cart');
      console.error('Add to cart error:', error);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category, page: 1 }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Our Products</h1>
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={loadProducts}
              className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={product.image || 'https://via.placeholder.com/300x200?text=Product'}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-blue-700">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>

                  {/* Stock Status */}
                  <div className="mb-3">
                    {product.inStock && product.stockQuantity > 0 ? (
                      <span className="text-green-600 text-sm font-medium">
                        ✓ In Stock ({product.stockQuantity} available)
                      </span>
                    ) : (
                      <span className="text-red-600 text-sm font-medium">
                        ✗ Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Specifications */}
                  {product.specifications && (
                    <div className="mb-3 text-sm text-gray-600">
                      {product.specifications.material && (
                        <div>Material: {product.specifications.material}</div>
                      )}
                      {product.specifications.dimensions && (
                        <div>Size: {product.specifications.dimensions}</div>
                      )}
                    </div>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock || product.stockQuantity === 0 || addingToCart === product._id}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      !product.inStock || product.stockQuantity === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : addingToCart === product._id
                        ? 'bg-blue-500 text-white cursor-wait'
                        : 'bg-blue-700 text-white hover:bg-blue-800'
                    }`}
                  >
                    {addingToCart === product._id ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </span>
                    ) : !product.inStock || product.stockQuantity === 0 ? (
                      'Out of Stock'
                    ) : (
                      'Add to Cart'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
