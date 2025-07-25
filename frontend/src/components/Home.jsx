import React, { useState } from "react";

const Home = ({ user, isLoggedIn, onLogin, onLogout, showLogin, onOpenLogin, onCloseLogin }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Brass Cable Gland A2",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop",
      description: "Premium quality brass cable gland for electrical installations"
    },
    {
      id: 2,
      name: "Brass Hex Screws Set",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1609205777835-66d3f3b6b0ad?w=300&h=200&fit=crop",
      description: "Professional grade brass hex screws for various applications"
    },
    {
      id: 3,
      name: "Brass Electrical Fitting",
      price: 78.50,
      image: "https://images.unsplash.com/photo-1609205777835-66d3f3b6b0ad?w=300&h=200&fit=crop",
      description: "High-conductivity brass electrical fitting components"
    },
    {
      id: 4,
      name: "Brass Pipe Connectors",
      price: 52.00,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop",
      description: "Durable brass pipe connectors for plumbing systems"
    },
    {
      id: 5,
      name: "Custom Brass Parts",
      price: 95.75,
      image: "https://images.unsplash.com/photo-1609205777835-66d3f3b6b0ad?w=300&h=200&fit=crop",
      description: "Precision-machined custom brass components"
    },
    {
      id: 6,
      name: "Brass Terminal Blocks",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=300&h=200&fit=crop",
      description: "Industrial-grade brass terminal blocks for electrical panels"
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    onLogin({ email });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    onLogin({ name, email });
    setShowSignup(false);
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

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Welcome Back</h3>
          <button 
            onClick={onCloseLogin}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium">
            Sign In
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <button 
            onClick={() => { onCloseLogin(); setShowSignup(true); }}
            className="text-blue-700 hover:underline font-medium"
          >
            Create one here
          </button>
        </p>
      </div>
    </div>
  );

  const SignupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
          <button 
            onClick={() => setShowSignup(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Create a password"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium">
            Create Account
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <button 
            onClick={() => { setShowSignup(false); onOpenLogin(); }}
            className="text-blue-700 hover:underline font-medium"
          >
            Sign in here
          </button>
        </p>
      </div>
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
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105">
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
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&h=400&fit=crop" 
                  alt="Brass Parts" 
                  className="rounded-xl shadow-2xl"
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

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Explore our premium brass parts collection</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="overflow-hidden rounded-t-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-700">${product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-colors transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg font-medium transition-colors">
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
