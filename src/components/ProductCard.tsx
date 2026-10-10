import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <div className="group bg-white rounded-2xl border border-amber-100 overflow-hidden hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image Area */}
      <div
        className="relative h-48 sm:h-56 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={() => onViewDetails(product)}
      >
        <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-500">
          {product.image}
        </span>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-amber-800 text-xs font-medium rounded-full border border-amber-200">
            {product.roast} Roast
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-medium rounded-full">
            <svg className="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {product.rating}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/5 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-amber-800 text-sm font-medium bg-white/90 px-4 py-2 rounded-full">
            View Details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-xs text-amber-500 font-medium uppercase tracking-wider mb-1">{product.origin}</p>
          <h3 className="font-playfair text-lg font-semibold text-amber-950 mb-2 group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.flavorNotes.slice(0, 3).map((note) => (
              <span key={note} className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-100">
                {note}
              </span>
            ))}
          </div>
          <p className="text-sm text-amber-700/70 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-50">
          <div>
            <span className="text-xl font-bold text-amber-900">${product.price.toFixed(2)}</span>
            <span className="text-xs text-amber-500 ml-1">/ {product.weight}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-900 hover:bg-amber-800 text-white text-sm font-medium rounded-full transition-all hover:shadow-lg hover:shadow-amber-900/20 active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
