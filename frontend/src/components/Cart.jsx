import React, { useState, useEffect } from 'react';
import cartService from '../services/cartService';

const Cart = ({ isOpen, onClose, user, isLoggedIn, cartUpdateTrigger }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Load cart when component mounts, user changes, or cart updates
  useEffect(() => {
    if (isOpen && isLoggedIn && user) {
      loadCart();
    }
  }, [isOpen, isLoggedIn, user, cartUpdateTrigger]);

  const loadCart = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await cartService.getCart();
      if (result.success) {
        setCart(result.cart);
      }
    } catch (error) {
      setError(error.message || 'Failed to load cart');
      console.error('Load cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      setError('');
      const result = await cartService.updateCartItem(productId, newQuantity);
      if (result.success) {
        setCart(result.cart);
      }
    } catch (error) {
      setError(error.message || 'Failed to update item');
      console.error('Update quantity error:', error);
    }
  };

  const removeItem = async (productId) => {
    try {
      setError('');
      const result = await cartService.removeFromCart(productId);
      if (result.success) {
        setCart(result.cart);
      }
    } catch (error) {
      setError(error.message || 'Failed to remove item');
      console.error('Remove item error:', error);
    }
  };

  const clearCart = async () => {
    try {
      setError('');
      const result = await cartService.clearCart();
      if (result.success) {
        setCart(result.cart);
      }
    } catch (error) {
      setError(error.message || 'Failed to clear cart');
      console.error('Clear cart error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          {!isLoggedIn ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Please login to view your cart</p>
              <button
                onClick={onClose}
                className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Login
              </button>
            </div>
          ) : loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading cart...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={loadCart}
                className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : !cart || cart.items.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.68 4.64a2 2 0 001.82 2.36h9.72a2 2 0 001.82-2.36L17 13" />
              </svg>
              <p className="text-gray-600 text-lg">Your cart is empty</p>
              <p className="text-gray-500 text-sm mt-2">Add some products to get started</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.productId} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.productImage || 'https://via.placeholder.com/80x80?text=Product'}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm">{item.productName}</h3>
                      <p className="text-blue-700 font-bold">${item.productPrice.toFixed(2)}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 bg-white border border-gray-300 rounded text-sm min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="ml-2 text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">${item.subtotal.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-medium">{cart.totalItems}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-gray-800">Total Amount:</span>
                  <span className="text-lg font-bold text-blue-700">${cart.totalAmount.toFixed(2)}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors font-medium">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
