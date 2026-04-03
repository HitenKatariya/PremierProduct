import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import productService from "../services/productService";
import { API_ORIGIN } from "../config/api";

const Home = ({ isLoggedIn, onLogin, showLogin, onOpenLogin, onCloseLogin, handleSignup }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [heroImage, setHeroImage] = useState("");
  const [categoryCards, setCategoryCards] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();

  const normalizeImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${API_ORIGIN}${url}`;
  };

  // Static fallback images per category (served from backend /images)
  const categoryFallbackImages = {
    'pressure gauge parts': `${API_ORIGIN}/images/presaure%20gauge%20parts.jpg`,
    'cable gland accessories': `${API_ORIGIN}/images/cable%20and%20accessories.jpg`,
    'panumatic part': `${API_ORIGIN}/images/panumatic%20parts.jpg`,
    'Air Conditioners and Refigeration Parts': `${API_ORIGIN}/images/air%20conditioner%20and%20refrigerator.jpg`,
    'brass insert': `${API_ORIGIN}/images/Brass%20insert.webp`,
    'brass fitting': `${API_ORIGIN}/images/Brass%20fitting.webp`
  };

  // Featured categories (names must match backend category values)
  const featuredCategories = [
    'pressure gauge parts',
    'cable gland accessories',
    'panumatic part',
    'Air Conditioners and Refigeration Parts',
    'brass insert',
    'brass fitting'
  ];

  // Load representative Cloudinary images per category for the home page
  useEffect(() => {
    const loadCategoryImages = async () => {
      try {
        setLoadingImages(true);
        setImageError("");

        // Fetch a good number of products and then pick one image per category
        const res = await productService.getProducts({ limit: 200 });
        if (!res.success || !Array.isArray(res.products)) {
          setImageError(res.message || "Failed to load product images");
          return;
        }

        const byCategory = {};
        res.products.forEach((p) => {
          if (p.category && p.image && !byCategory[p.category]) {
            byCategory[p.category] = p;
          }
        });

        const cards = featuredCategories.map((name) => {
          const apiImage = byCategory[name]?.image || "";
          const normalizedApiImage = normalizeImageUrl(apiImage);
          const fallbackImage = categoryFallbackImages[name] || "";
          return {
            name,
            image: normalizedApiImage || fallbackImage,
          };
        });

        setCategoryCards(cards);

        // Pick a hero image from any product with a valid image
        const firstWithImage = res.products.find((p) => p.image);
        if (firstWithImage) {
          setHeroImage(normalizeImageUrl(firstWithImage.image));
        }
      } catch (err) {
        console.error("Home hero/category image load error:", err);
        setImageError(err.message || "Failed to load product images");
      } finally {
        setLoadingImages(false);
      }
    };

    loadCategoryImages();
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

  // handleLogout kept previously for header integration; not used here after cleanup

  // addToCart removed with dynamic previews

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
                    <button 
                      onClick={() => navigate('/products')}
                      className="border-2 border-white text-white hover:bg-white hover:text-blue-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                    >
                      View Catalog
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="bg-white bg-opacity-10 p-4 sm:p-6 rounded-2xl backdrop-blur-sm w-full max-w-md">
                    <div className="w-full h-56 sm:h-64 lg:h-72 rounded-xl overflow-hidden shadow-2xl">
                      <img
                        src={`${API_ORIGIN}/images/Premium%20brass%20parts%20and%20fittings.jpg`}
                        alt="Premium brass parts and fittings"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/logo-web.svg";
                        }}
                      />
                    </div>
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

          {/* Featured Categories Section (Static images user requested) */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse by Category</h2>
                <p className="text-gray-600 text-lg">Tap a category image to jump directly to its products</p>
                {imageError && (
                  <p className="mt-2 text-sm text-red-600">{imageError}</p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {(categoryCards.length ? categoryCards : featuredCategories.map(name => ({ name, image: "" })) ).map(cat => (
                  <div
                    key={cat.name}
                    className="group relative rounded-xl overflow-hidden shadow hover:shadow-lg cursor-pointer bg-white border"
                    onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
                  >
                    <div className="aspect-video w-full overflow-hidden bg-gray-100">
                      {cat.image || categoryFallbackImages[cat.name] ? (
                        <img
                          src={cat.image || categoryFallbackImages[cat.name]}
                          alt={cat.name}
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            const fallback = categoryFallbackImages[cat.name];
                            if (fallback && e.currentTarget.src !== fallback) {
                              e.currentTarget.src = fallback;
                            } else {
                              e.currentTarget.classList.add("hidden");
                            }
                          }}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-300" />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-semibold tracking-wide drop-shadow">{cat.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/** Removed: Popular Categories (Sample Products) grid **/}

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

