import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Saree } from '../data/sarees';
import { useCart } from '../context/CartContext';

interface ProductGridProps {
  products: Saree[];
  selectedFabric: string;
}

export default function ProductGrid({ products, selectedFabric }: ProductGridProps) {
  const { dispatch } = useCart();

  const filteredProducts = selectedFabric === 'all'
    ? products
    : products.filter(product => product.fabric === selectedFabric);

  const addToCart = (product: Saree) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        fabric: product.fabric,
      },
    });
  };

  return (
    <section id="products-section" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide text-gray-900 mb-4">
            {selectedFabric === 'all' ? 'ALL SAREES' : `${selectedFabric.toUpperCase()} SAREES`}
          </h2>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="relative overflow-hidden">
                {/* Product badges */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-red-500 text-white px-3 py-1 text-xs font-medium rounded">
                      SALE
                    </span>
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gray-800 text-white px-3 py-1 text-xs font-medium rounded">
                      SOLD OUT
                    </span>
                  </div>
                )}

                {/* Product image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Hover actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Eye size={16} className="text-gray-700" />
                    </Link>
                    <button className="bg-white p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <Heart size={16} className="text-gray-700" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.fabric}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{product.price}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 text-xs font-medium text-center hover:bg-gray-200 transition-colors duration-200"
                  >
                    VIEW
                  </Link>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={!product.inStock}
                    className="flex-1 bg-black text-white py-2 px-4 text-xs font-medium hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-1 whitespace-nowrap"
                  >
                    <ShoppingCart size={12} />
                    <span>ADD TO CART</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found for {selectedFabric} fabric.</p>
          </div>
        )}
      </div>
    </section>
  );
}
