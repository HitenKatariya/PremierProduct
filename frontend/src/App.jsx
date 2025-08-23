import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Products from "./components/Products";
import Cart from "./components/Cart";
import authService from "./services/authService";
import cartService from "./services/cartService";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartUpdateTrigger, setCartUpdateTrigger] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (authService.isAuthenticated()) {
          const profileResult = await authService.getProfile();
          if (profileResult.success) {
            setUser(profileResult.user);
            setIsLoggedIn(true);
          } else {
            // Token is invalid, clear it
            authService.removeToken();
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async (loginData) => {
    try {
      // If this is called from our updated Login component, it will have user and token
      if (loginData.user && loginData.token) {
        setUser(loginData.user);
        setIsLoggedIn(true);
        setShowLogin(false);
        console.log("✅ User logged in successfully:", loginData.user);
        // Redirect to home page after successful login
        navigate('/');
        return;
      }

      // Legacy support for old login flow
      let result;
      
      if (loginData.username && loginData.email) {
        // This is signup data
        result = await authService.register(loginData.username, loginData.email, loginData.password || 'defaultPassword123');
      } else {
        // This is login data (from current implementation)
        // For now, we'll treat any login as successful with mock data
        // In a real app, you'd get email/password from the form
        result = {
          success: true,
          user: { email: loginData.email, username: loginData.name || loginData.email.split('@')[0] }
        };
      }

      if (result.success) {
        setUser(result.user);
        setIsLoggedIn(true);
        setShowLogin(false);
        // Redirect to home page after successful login
        navigate('/');
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleSignup = async (signupData) => {
    try {
      // Handle signup success callback
      if (signupData.user && signupData.token) {
        setUser(signupData.user);
        setIsLoggedIn(true);
        setShowLogin(false);
        console.log("✅ User registered successfully:", signupData.user);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout on frontend even if server call fails
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const openLoginModal = () => {
    setShowLogin(true);
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  };

  const openCartModal = () => {
    setShowCart(true);
  };

  const closeCartModal = () => {
    setShowCart(false);
  };

  const updateCartCount = () => {
    // Trigger cart updates by incrementing a counter
    setCartUpdateTrigger(prev => prev + 1);
  };

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar 
        user={user} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        onOpenLogin={openLoginModal}
        onOpenCart={openCartModal}
        cartUpdateTrigger={cartUpdateTrigger}
      />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                user={user} 
                isLoggedIn={isLoggedIn} 
                onLogin={handleLogin} 
                onLogout={handleLogout}
                showLogin={showLogin}
                onOpenLogin={openLoginModal}
                onCloseLogin={closeLoginModal}
                handleSignup={handleSignup}
              />
            } 
          />
          <Route path="/about" element={<About />} />
          <Route 
            path="/products" 
            element={
              <Products 
                user={user} 
                isLoggedIn={isLoggedIn} 
                onUpdateCartCount={updateCartCount}
                showLogin={showLogin}
                onOpenLogin={openLoginModal}
                onCloseLogin={closeLoginModal}
                onLogin={handleLogin}
                handleSignup={handleSignup}
              />
            } 
          />
          <Route path="/contact" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-2xl text-gray-600">Contact Page Coming Soon</h1></div>} />
        </Routes>
        <Footer />
        
        {/* Cart Modal */}
        <Cart 
          isOpen={showCart}
          onClose={closeCartModal}
          user={user}
          isLoggedIn={isLoggedIn}
          cartUpdateTrigger={cartUpdateTrigger}
        />
      </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;