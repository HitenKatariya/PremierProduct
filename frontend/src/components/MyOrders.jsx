import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import authService from '../services/authService';
import { useNotification } from './Notification';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToast } = useNotification();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        if (!authService.isAuthenticated()) {
          addToast('Please login to view your orders', 'error');
          navigate('/');
          return;
        }
        setLoading(true);
        setError('');
        const res = await orderService.getMyOrders();
        if (res.success && Array.isArray(res.orders)) {
          setOrders(res.orders);
        } else {
          setError(res.message || 'Failed to load orders');
        }
      } catch (err) {
        console.error('MyOrders load error:', err);
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [navigate, addToast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {orders.length === 0 ? (
          <p className="text-gray-600">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p className="font-semibold">Order #{order.orderNumber || order._id}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Total: ₹{order.total?.toFixed(0)}</p>
                    <span className="inline-flex px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
                      {order.orderStatus}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-gray-100 mt-2">
                  {order.items?.map((item) => (
                    <div key={item._id} className="flex items-center py-2 text-sm">
                      <div className="w-12 h-12 bg-gray-100 rounded mr-3 flex items-center justify-center">
                        {item.productImage ? (
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-11 h-11 object-cover rounded"
                            onError={(e) => {
                              e.currentTarget.classList.add('hidden');
                              e.currentTarget.onerror = null;
                            }}
                          />
                        ) : (
                          <span className="text-xl">📦</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.productName}</p>
                        <p className="text-gray-500">Qty {item.quantity} × ₹{item.price?.toFixed(0)}</p>
                      </div>
                      <div className="text-right font-semibold">₹{item.subtotal?.toFixed(0)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
