import React, { useState } from 'react';
import { CartItem, OrderInfo } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onComplete: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, cartItems, onComplete }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [form, setForm] = useState<OrderInfo>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleComplete = () => {
    setStep('form');
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    });
    onComplete();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-amber-950/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {step === 'form' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-amber-100">
              <h2 className="font-playfair text-xl font-bold text-amber-950">Checkout</h2>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center text-amber-600 hover:bg-amber-50 hover:text-amber-800 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100">
                <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-amber-700">{item.product.name} × {item.quantity}</span>
                      <span className="text-amber-900 font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-amber-200 pt-2 mt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-600">Shipping</span>
                      <span className="text-amber-900 font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold mt-1">
                      <span className="text-amber-900">Total</span>
                      <span className="text-amber-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-3">Shipping Information</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                  />
                  <input
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                  />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full mt-3 px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                />
                <input
                  name="address"
                  placeholder="Street Address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full mt-3 px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                  />
                  <input
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={form.zipCode}
                    onChange={handleChange}
                    required
                    className="px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Payment */}
              <div>
                <h3 className="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-3">Payment Details</h3>
                <input
                  name="cardNumber"
                  placeholder="Card Number"
                  value={form.cardNumber}
                  onChange={handleChange}
                  required
                  maxLength={19}
                  className="w-full px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                />
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <input
                    name="expiry"
                    placeholder="MM/YY"
                    value={form.expiry}
                    onChange={handleChange}
                    required
                    maxLength={5}
                    className="px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                  />
                  <input
                    name="cvv"
                    placeholder="CVV"
                    value={form.cvv}
                    onChange={handleChange}
                    required
                    maxLength={4}
                    className="px-4 py-2.5 bg-amber-50/50 border border-amber-200 rounded-xl text-sm text-amber-900 placeholder-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-900 hover:bg-amber-800 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-amber-900/20 active:scale-[0.98]"
              >
                Place Order — ${total.toFixed(2)}
              </button>

              <p className="text-xs text-center text-amber-400">
                🔒 This is a simulated checkout. No real payment will be processed.
              </p>
            </form>
          </>
        )}

        {step === 'processing' && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-700 rounded-full animate-spin mb-6" />
            <h3 className="font-playfair text-xl font-bold text-amber-950 mb-2">Processing your order...</h3>
            <p className="text-amber-600 text-sm">Preparing your specialty coffee for shipment</p>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-playfair text-2xl font-bold text-amber-950 mb-2">Order Confirmed!</h3>
            <p className="text-amber-600 text-sm mb-6 max-w-xs">
              Thank you for your order! Your specialty coffee is being prepared with care. You'll receive a confirmation email shortly.
            </p>
            <button
              onClick={handleComplete}
              className="px-8 py-3 bg-amber-900 hover:bg-amber-800 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:shadow-amber-900/20 active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
