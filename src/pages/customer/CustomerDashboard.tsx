import { useState } from 'react';
import { Search, ShoppingCart, Filter } from 'lucide-react';
import { mockProducts, mockCategories } from '../../data/mockData';
import { useCart } from '../../contexts/CartContext';
import makLogo from '../../assests/maklogo.png';
import Productslogo from '../../assests/products.png';


export default function CustomerDashboard() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showNotification, setShowNotification] = useState(false);

  const filteredProducts = mockProducts
    .filter((p) => p.status === 'active')
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div className="space-y-6">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          Product added to cart successfully
        </div>
      )}

      <div className="rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">

        {/* Top section: Text + Logo */}
        <div className="flex items-center justify-center px-8 py-6">

          <div >
            {/* <img
              src={makLogo}
              alt="MAK Lubricants"
              className="h-14 object-contain"
            /> */}
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Anuradha Auto Service Centre
            </h1>

          </div>


        </div>

        {/* Bottom section: Product cans image */}
        <div className="bg-gradient-to-t from-black/30 to-transparent px-6 pb-6">
          <img
            src={Productslogo}
            alt="MAK Lubricants Range"
            className="w-full max-h-64 object-contain mx-auto"
          />
        </div>

      </div>



      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
          >
            <option value="all">All Categories</option>
            {mockCategories
              .filter((c) => c.status === 'active')
              .map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition group">
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/3]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              {product.stock < 20 && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Low Stock
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-2">
                  {product.category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{product.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">{product.stock} in stock</p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
}
