import React, { useState, useMemo } from 'react';
import { Product, CartItem } from './types';
import { products, categories } from './data/products';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.flavorNotes.some((note) => note.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 2500);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showNotification(`${product.name} added to cart!`);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartItems={cartItems}
        onCartClick={() => setIsCartOpen(true)}
        onLogoClick={() => {
          setSearchQuery('');
          setSelectedCategory('All');
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-amber-600 font-medium text-sm uppercase tracking-[0.2em] mb-4">
              Artisan Roasted Coffee
            </p>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-amber-950 leading-tight mb-6">
              Exceptional Coffee,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-600">
                Thoughtfully Sourced
              </span>
            </h1>
            <p className="text-amber-700/80 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
              From the world's finest growing regions to your cup. Each bean is carefully selected, 
              expertly roasted, and delivered fresh to bring you an extraordinary coffee experience.
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-200/20 rounded-full blur-3xl" />
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-amber-900 text-white shadow-lg shadow-amber-900/20'
                  : 'bg-white text-amber-700 border border-amber-200 hover:border-amber-400 hover:bg-amber-50'
              }`}
            >
              {category}
            </button>
          ))}
          {searchQuery && (
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm text-amber-500">
                {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchQuery}"
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-amber-600 hover:text-amber-800 underline"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🔍</span>
            <h3 className="font-playfair text-xl font-bold text-amber-900 mb-2">No coffees found</h3>
            <p className="text-amber-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">☕</span>
                <span className="font-playfair text-lg font-bold text-white">Ember & Bloom</span>
              </div>
              <p className="text-amber-300/70 text-sm leading-relaxed">
                Dedicated to bringing you the world's finest specialty coffees, 
                roasted with precision and delivered with care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-amber-300/70">
                <li><button className="hover:text-white transition-colors">Our Story</button></li>
                <li><button className="hover:text-white transition-colors">Brewing Guides</button></li>
                <li><button className="hover:text-white transition-colors">Subscriptions</button></li>
                <li><button className="hover:text-white transition-colors">Wholesale</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Free Shipping</h4>
              <p className="text-amber-300/70 text-sm leading-relaxed">
                Orders over $50 ship free. All orders are roasted to order and shipped within 24 hours.
              </p>
              <div className="flex gap-3 mt-4">
                <span className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center text-amber-200 hover:bg-amber-800 cursor-pointer transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                </span>
                <span className="w-8 h-8 bg-amber-900 rounded-full flex items-center justify-center text-amber-200 hover:bg-amber-800 cursor-pointer transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-sm text-amber-400/70">
            <p>© 2026 Ember & Bloom Coffee Co. All rights reserved. Crafted with ❤️ and ☕</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      {/* Checkout Modal */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onComplete={handleCheckoutComplete}
      />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-slide-up">
          <div className="flex items-center gap-2 px-5 py-3 bg-amber-900 text-white rounded-full shadow-xl shadow-amber-900/30">
            <svg className="w-4 h-4 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-medium">{notification}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
