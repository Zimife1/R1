import React from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-amber-950/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-amber-700 hover:text-amber-900 hover:bg-amber-50 transition-all shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="h-56 sm:h-72 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center rounded-t-3xl">
          <span className="text-8xl sm:text-9xl">{product.image}</span>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-sm text-amber-500 font-medium uppercase tracking-wider mb-1">{product.origin}</p>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-amber-950">{product.name}</h2>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 rounded-full border border-amber-200">
              <svg className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-amber-800">{product.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm font-medium rounded-full">
              {product.roast} Roast
            </span>
            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full border border-amber-100">
              {product.weight}
            </span>
          </div>

          <p className="text-amber-800 leading-relaxed mb-6">{product.description}</p>

          {/* Flavor Notes */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-amber-900 uppercase tracking-wider mb-3">Flavor Notes</h4>
            <div className="flex flex-wrap gap-2">
              {product.flavorNotes.map((note) => (
                <span key={note} className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 text-sm rounded-full border border-amber-200 font-medium">
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between pt-6 border-t border-amber-100">
            <div>
              <span className="text-3xl font-bold text-amber-900">${product.price.toFixed(2)}</span>
              <span className="text-sm text-amber-500 ml-2">/ {product.weight}</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Quantity Controls */}
              <div className="flex items-center border border-amber-200 rounded-full overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-8 text-center text-sm font-semibold text-amber-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-900 hover:bg-amber-800 text-white font-medium rounded-full transition-all hover:shadow-lg hover:shadow-amber-900/20 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
