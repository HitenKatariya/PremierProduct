import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import productService from "../services/productService";
import Login from "./Login";
import Signup from "./Signup";

const Home = ({ user, isLoggedIn, onLogin, onLogout, showLogin, onOpenLogin, onCloseLogin, handleSignup }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Define categories with their display names
  const categories = [
    { key: 'brass-turned-parts', name: 'Brass Turned Parts', color: 'from-red-600 to-red-800' },
    { key: 'brass-plumbing-parts', name: 'Brass Plumbing Parts', color: 'from-red-600 to-red-800' },
    { key: 'brass-electrical-parts', name: 'Brass Electrical Parts', color: 'from-red-600 to-red-800' },
    { key: 'brass-energy-meter-parts', name: 'Brass Energy Meter Parts', color: 'from-red-600 to-red-800' },
    { key: 'brass-transformer-parts', name: 'Brass Transformer Parts', color: 'from-red-600 to-red-800' },
    { key: 'brass-auto-parts', name: 'Brass Auto Parts', color: 'from-red-600 to-red-800' },
    { key: 'brass-forging-parts', name: 'Brass Forging Parts', color: 'from-red-600 to-red-800' },
    { key: 'brass-customized-parts', name: 'Brass Customized Parts', color: 'from-red-600 to-red-800' }
  ];

  // Fetch products by category
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        // First, let's fetch all products and then group them by category
        const response = await productService.getProducts({ page: 1, limit: 50 });
        console.log('All products response:', response);
        
        if (response.success && response.products.length > 0) {
          const categoryData = {};
          
          // Group products by category
          response.products.forEach(product => {
            const category = product.category;
            if (!categoryData[category]) {
              categoryData[category] = [];
            }
            if (categoryData[category].length < 6) {
              categoryData[category].push(product);
            }
          });
          
          console.log('Grouped products by category:', categoryData);
          setProductsByCategory(categoryData);
        } else {
          console.log('No products found in response');
          setProductsByCategory({});
        }
      } catch (error) {
        console.error('Error fetching products by category:', error);
        setProductsByCategory({});
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, []);

  const handleShopNow = () => {
    if (isLoggedIn) {
      // If user is already logged in, go directly to products
      navigate('/products');
    } else {
      // If user is not logged in, show login modal
      onOpenLogin();
    }
  };

  const handleLogout = () => {
    onLogout();
    setShowSignup(false);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    // Show success message (you can implement a toast notification here)
    alert(`${product.name} added to cart!`);
  };

  // Modal wrapper components
  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Login 
        onLoginSuccess={onLogin} 
        onClose={onCloseLogin}
        onSwitchToSignup={() => {
          onCloseLogin();
          setShowSignup(true);
        }}
      />
    </div>
  );

  const SignupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Signup 
        onSignupSuccess={handleSignup} 
        onClose={() => setShowSignup(false)}
        onSwitchToLogin={() => {
          setShowSignup(false);
          onOpenLogin();
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Premium Brass Parts for Every Industry
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Manufacturing excellence since decades. Discover our comprehensive range of 
                high-quality brass components designed for durability and precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleShopNow}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
                >
                  Shop Now
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
                  View Catalog
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white bg-opacity-10 p-8 rounded-2xl backdrop-blur-sm">
                <img 
                  src="/image.png" 
                  alt="Premium Brass Parts and Fittings" 
                  className="rounded-xl shadow-2xl w-full h-auto max-w-md object-cover"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.target.src = "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=400&fit=crop&crop=center";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Premier Products?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              With decades of experience in brass manufacturing, we deliver unmatched quality and precision
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Assured</h3>
              <p className="text-gray-600">Every product undergoes rigorous quality testing to ensure premium standards</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Quick turnaround times with reliable shipping across the globe</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Custom Solutions</h3>
              <p className="text-gray-600">Tailored brass components designed to meet your specific requirements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products by Category Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Product Categories</h2>
            <p className="text-gray-600 text-lg">Explore our comprehensive range of brass components</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              <p className="mt-4 text-gray-600">Loading product categories...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(productsByCategory).map(([categoryKey, categoryProducts]) => {
                if (categoryProducts.length === 0) return null;
                
                // Find the category display name
                const categoryInfo = categories.find(cat => cat.key === categoryKey) || {
                  key: categoryKey,
                  name: categoryKey.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' '),
                  color: 'from-red-600 to-red-800'
                };
                
                return (
                  <div 
                    key={categoryKey} 
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => navigate(`/products?category=${categoryKey}`)}
                  >
                    {/* Product Images Grid */}
                    <div className="h-48 bg-gray-100 p-4">
                      <div className="grid grid-cols-2 gap-2 h-full">
                        {categoryProducts.slice(0, 4).map((product, index) => (
                          <div key={product._id} className="overflow-hidden rounded-lg">
                            <img
                              src={product.image || "/images/products/brass-fitting/brass-fitting-1.jpg"}
                              alt={product.name}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&h=150&fit=crop";
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Category Banner */}
                    <div className={`bg-gradient-to-r ${categoryInfo.color} text-white p-4 text-center`}>
                      <h3 className="text-lg font-bold">{categoryInfo.name}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/products')}
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Premier Products for their brass component needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onOpenLogin}
              className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Get Started Today
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-3 rounded-lg font-bold transition-colors">
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && <LoginModal />}
      
      {/* Signup Modal */}
      {showSignup && <SignupModal />}
    </div>
  );
};

export default Home;
