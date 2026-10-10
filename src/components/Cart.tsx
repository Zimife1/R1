import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-amber-950/40 backdrop-blur-sm" onClick={onClose} />
      )}

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-amber-100">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="font-playfair text-xl font-bold text-amber-950">Your Cart</h2>
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-50 hover:text-amber-800 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="text-6xl mb-4">🛒</span>
                <p className="text-amber-800 font-medium text-lg mb-2">Your cart is empty</p>
                <p className="text-amber-500 text-sm">Discover our exceptional coffees and add your favorites.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{item.product.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-amber-900 truncate">{item.product.name}</h4>
                      <p className="text-xs text-amber-500 mb-2">{item.product.origin} · {item.product.weight}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-amber-200 rounded-full overflow-hidden bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-6 text-center text-xs font-semibold text-amber-900">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <span className="text-sm font-bold text-amber-900">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="self-start w-7 h-7 rounded-full flex items-center justify-center text-amber-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-amber-100 px-6 py-5 bg-amber-50/30">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Subtotal</span>
                  <span className="text-amber-900 font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Shipping</span>
                  <span className="text-amber-900 font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 50 && (
                  <p className="text-xs text-amber-500 italic">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-amber-200">
                  <span className="text-amber-900">Total</span>
                  <span className="text-amber-900">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={onCheckout}
                className="w-full py-3.5 bg-amber-900 hover:bg-amber-800 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-amber-900/20 active:scale-[0.98]"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
