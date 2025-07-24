import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLogin(false); // Close login modal after successful login
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const openLoginModal = () => {
    setShowLogin(true);
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <Navbar 
        user={user} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout} 
        onOpenLogin={openLoginModal}
      />
      <Home 
        user={user} 
        isLoggedIn={isLoggedIn} 
        onLogin={handleLogin} 
        onLogout={handleLogout}
        showLogin={showLogin}
        onOpenLogin={openLoginModal}
        onCloseLogin={closeLoginModal}
      />
      <Footer />
    </div>
  );
}

export default App;