import { Package } from 'lucide-react';
import { mockOrders } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export default function OrderHistory() {
  const { user } = useAuth();
  const userOrders = mockOrders.filter((order) => order.customerId === user?.id);

  if (userOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-600">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Order History</h1>
        <p className="text-blue-100">Track and review your past orders</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {userOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <span
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                      order.paymentStatus === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Products</h4>
              <div className="space-y-3">
                {order.products.map((product, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">${order.total.toFixed(2)}</span>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Track Order
                </button>
                <button className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
