import React, { useState } from "react";

const Home = ({ user, isLoggedIn, onLogin, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    // Simulate successful login
    onLogin({ email });
    setShowLogin(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    // Simulate successful signup
    onLogin({ name, email });
    setShowSignup(false);
  };

  const handleLogout = () => {
    onLogout();
    setShowLogin(false);
    setShowSignup(false);
  };

  const LoginForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mb-10">
      <h3 className="text-xl font-semibold text-red-700 mb-4 text-center">Login</h3>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-red-700 text-white py-3 px-6 rounded-lg hover:bg-red-800 transition flex-1">
            Login
          </button>
          <button 
            type="button" 
            onClick={() => setShowLogin(false)}
            className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
      <p className="text-center mt-4 text-gray-600">
        Don't have an account?{" "}
        <button 
          onClick={() => { setShowLogin(false); setShowSignup(true); }}
          className="text-red-700 hover:underline"
        >
          Sign up here
        </button>
      </p>
    </div>
  );

  const SignupForm = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mb-10">
      <h3 className="text-xl font-semibold text-red-700 mb-4 text-center">Create Account</h3>
      <form className="space-y-4" onSubmit={handleSignup}>
        <div>
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
            placeholder="Create a password"
            required
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" className="bg-red-700 text-white py-3 px-6 rounded-lg hover:bg-red-800 transition flex-1">
            Sign Up
          </button>
          <button 
            type="button" 
            onClick={() => setShowSignup(false)}
            className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <button 
          onClick={() => { setShowSignup(false); setShowLogin(true); }}
          className="text-red-700 hover:underline"
        >
          Login here
        </button>
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-6">
          Welcome to Premier Products
        </h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          We manufacture high-quality brass parts and components for various industries.
        </p>
        
        {/* Login/Signup Section */}
        {isLoggedIn ? (
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg shadow-md max-w-md mx-auto mb-10">
            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">Welcome Back!</h3>
            <p className="text-green-600 text-center mb-4">
              {user?.name ? `Hello ${user.name}!` : `Hello ${user?.email}!`}
            </p>
            <p className="text-gray-600 text-center mb-4">
              You are successfully logged in. Explore our products and services.
            </p>
            <div className="flex flex-col gap-3">
              <button className="bg-red-700 text-white py-3 px-6 rounded-lg hover:bg-red-800 transition w-full">
                View My Orders
              </button>
              <button className="border border-red-700 text-red-700 py-3 px-6 rounded-lg hover:bg-red-50 transition w-full">
                Browse Products
              </button>
              <button 
                onClick={handleLogout}
                className="border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition w-full text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        ) : showLogin ? (
          <LoginForm />
        ) : showSignup ? (
          <SignupForm />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mb-10">
            <h3 className="text-xl font-semibold text-red-700 mb-4 text-center">Customer Login</h3>
            <p className="text-gray-600 text-center mb-4">Access your account to view orders and manage your profile</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-red-700 text-white py-3 px-6 rounded-lg hover:bg-red-800 transition w-full"
              >
                Login to Your Account
              </button>
              <button 
                onClick={() => setShowSignup(true)}
                className="border border-red-700 text-red-700 py-3 px-6 rounded-lg hover:bg-red-50 transition w-full"
              >
                Create New Account
              </button>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-red-700 mb-3">Quality Products</h3>
            <p className="text-gray-600">Premium brass components manufactured with precision and care.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-red-700 mb-3">Expert Craftsmanship</h3>
            <p className="text-gray-600">Years of experience in brass manufacturing and engineering.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-red-700 mb-3">Reliable Service</h3>
            <p className="text-gray-600">Committed to delivering excellence in every product we make.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
