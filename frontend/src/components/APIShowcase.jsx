import React, { useState } from 'react';

const APIShowcase = () => {
  const [expandedCategory, setExpandedCategory] = useState('products');

  const endpoints = {
    products: {
      icon: '📦',
      title: 'Products',
      description: 'Browse and manage product catalog',
      endpoints: [
        { method: 'GET', path: '/api/products', auth: false, desc: 'Get all products with filters' },
        { method: 'GET', path: '/api/products/:id', auth: false, desc: 'Get single product' },
        { method: 'POST', path: '/api/products', auth: 'Admin', desc: 'Create new product' },
        { method: 'PUT', path: '/api/products/:id', auth: 'Admin', desc: 'Update product' },
        { method: 'DELETE', path: '/api/products/:id', auth: 'Admin', desc: 'Delete product' }
      ]
    },
    auth: {
      icon: '👤',
      title: 'Authentication',
      description: 'User registration and login',
      endpoints: [
        { method: 'POST', path: '/api/users/register', auth: false, desc: 'Register new user' },
        { method: 'POST', path: '/api/users/login', auth: false, desc: 'User login' },
        { method: 'GET', path: '/api/users/profile', auth: true, desc: 'Get user profile' },
        { method: 'PUT', path: '/api/users/profile', auth: true, desc: 'Update profile' }
      ]
    },
    cart: {
      icon: '🛒',
      title: 'Shopping Cart',
      description: 'Manage shopping cart items',
      endpoints: [
        { method: 'GET', path: '/api/cart', auth: true, desc: 'Get user cart' },
        { method: 'POST', path: '/api/cart/add', auth: true, desc: 'Add to cart' },
        { method: 'PUT', path: '/api/cart/update/:itemId', auth: true, desc: 'Update quantity' },
        { method: 'DELETE', path: '/api/cart/remove/:itemId', auth: true, desc: 'Remove item' },
        { method: 'DELETE', path: '/api/cart/clear', auth: true, desc: 'Clear cart' }
      ]
    },
    orders: {
      icon: '📋',
      title: 'Orders',
      description: 'Create and track orders',
      endpoints: [
        { method: 'POST', path: '/api/orders', auth: true, desc: 'Create order' },
        { method: 'GET', path: '/api/orders', auth: true, desc: 'Get user orders' },
        { method: 'GET', path: '/api/orders/:id', auth: true, desc: 'Get order details' },
        { method: 'PUT', path: '/api/orders/:id/status', auth: true, desc: 'Update status' }
      ]
    },
    admin: {
      icon: '👨‍💼',
      title: 'Admin Panel',
      description: 'Admin dashboard and controls',
      endpoints: [
        { method: 'POST', path: '/api/admin/auth/login', auth: false, desc: 'Admin login' },
        { method: 'GET', path: '/api/admin/dashboard', auth: 'Admin', desc: 'Dashboard stats' },
        { method: 'GET', path: '/api/admin/products', auth: 'Admin', desc: 'All products' },
        { method: 'POST', path: '/api/admin/products', auth: 'Admin', desc: 'Create product' },
        { method: 'GET', path: '/api/admin/orders', auth: 'Admin', desc: 'All orders' }
      ]
    },
    contact: {
      icon: '📧',
      title: 'Contact Form',
      description: 'Send contact messages',
      endpoints: [
        { method: 'POST', path: '/api/contact', auth: false, desc: 'Send message' }
      ]
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET':
        return 'bg-blue-100 text-blue-800';
      case 'POST':
        return 'bg-green-100 text-green-800';
      case 'PUT':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAuthColor = (auth) => {
    if (auth === false) return 'text-green-600';
    if (auth === true) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🚀 API Endpoints Showcase</h1>
          <p className="text-gray-300 text-lg">
            Premier Products Backend - Running on Render (premierproduct-iyi9.onrender.com)
          </p>
          <div className="mt-4 inline-block bg-blue-900 text-blue-100 px-4 py-2 rounded-lg">
            <code className="text-sm">https://premierproduct-iyi9.onrender.com/api</code>
          </div>
        </div>

        {/* Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-green-900 text-green-100 p-4 rounded-lg border border-green-700">
            <div className="text-2xl font-bold">✅ Active</div>
            <div className="text-sm text-green-200">Backend Status</div>
          </div>
          <div className="bg-blue-900 text-blue-100 p-4 rounded-lg border border-blue-700">
            <div className="text-2xl font-bold">6+</div>
            <div className="text-sm text-blue-200">API Categories</div>
          </div>
          <div className="bg-purple-900 text-purple-100 p-4 rounded-lg border border-purple-700">
            <div className="text-2xl font-bold">30+</div>
            <div className="text-sm text-purple-200">Total Endpoints</div>
          </div>
        </div>

        {/* Endpoints Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {Object.entries(endpoints).map(([key, category]) => (
            <div
              key={key}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-colors"
            >
              {/* Category Header */}
              <div
                className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 cursor-pointer hover:from-blue-700 hover:to-blue-900 transition-all"
                onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <div>
                      <h2 className="text-white text-xl font-bold">{category.title}</h2>
                      <p className="text-blue-200 text-sm">{category.description}</p>
                    </div>
                  </div>
                  <span className="text-white text-2xl">
                    {expandedCategory === key ? '−' : '+'}
                  </span>
                </div>
              </div>

              {/* Category Endpoints */}
              {expandedCategory === key && (
                <div className="p-6 space-y-3">
                  {category.endpoints.map((endpoint, idx) => (
                    <div key={idx} className="bg-gray-700 p-4 rounded-lg hover:bg-gray-650 transition-colors">
                      <div className="flex flex-wrap items-start gap-2 mb-2">
                        <span className={`px-3 py-1 rounded font-semibold text-xs ${getMethodColor(endpoint.method)}`}>
                          {endpoint.method}
                        </span>
                        <span className={`text-xs font-semibold ${getAuthColor(endpoint.auth)}`}>
                          {endpoint.auth === false ? '🔓 Public' : endpoint.auth === true ? '🔐 Auth' : '👑 Admin'}
                        </span>
                      </div>
                      <code className="block font-mono text-white text-sm mb-2 break-words">
                        {endpoint.path}
                      </code>
                      <p className="text-gray-300 text-sm">{endpoint.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Start */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">⚡ Quick Start Examples</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Get Products */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-blue-300 font-semibold mb-2">Get All Products</p>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`curl -X GET \\
  "https://premierproduct-iyi9.onrender.com/api/products"`}
              </pre>
            </div>

            {/* Register User */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-blue-300 font-semibold mb-2">Register User</p>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`curl -X POST \\
  "https://premierproduct-iyi9.onrender.com/api/users/register" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'`}
              </pre>
            </div>

            {/* Get Cart */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-blue-300 font-semibold mb-2">Get User Cart</p>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`curl -X GET \\
  "https://premierproduct-iyi9.onrender.com/api/cart" \\
  -H "Authorization: Bearer TOKEN"`}
              </pre>
            </div>

            {/* Create Order */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-blue-300 font-semibold mb-2">Create Order</p>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`curl -X POST \\
  "https://premierproduct-iyi9.onrender.com/api/orders" \\
  -H "Authorization: Bearer TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"shippingAddress":"123 Main St"}'`}
              </pre>
            </div>
          </div>
        </div>

        {/* Base URL Info */}
        <div className="bg-blue-900 border border-blue-700 rounded-lg p-6">
          <div className="text-center">
            <h4 className="text-blue-200 text-sm font-semibold mb-2">BASE URL</h4>
            <code className="text-white text-lg font-bold">https://premierproduct-iyi9.onrender.com/api</code>
            <p className="text-blue-300 text-sm mt-3">
              ✅ Connected from Frontend (port 5173) via <code className="bg-blue-800 px-2 py-1 rounded">VITE_API_URL</code>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400 text-sm">
          <p>🔗 Frontend: https://premier-product.vercel.app</p>
          <p className="mt-2">For detailed documentation, see <code className="bg-gray-700 px-2 py-1 rounded">API_ENDPOINTS.md</code></p>
        </div>
      </div>
    </div>
  );
};

export default APIShowcase;
