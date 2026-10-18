import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class RootErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('DJN Tech UI Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="w-24 h-24 flex items-center justify-center mb-4">
            <img src="/logo-original.png" alt="DJN Tech" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl font-bold mb-2">DJN Tech Store</h2>
          <p className="text-xs text-slate-500 max-w-sm mb-4">
            An unexpected error occurred while loading. Click below to reload the storefront.
          </p>
          {this.state.error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs font-mono rounded-lg max-w-md overflow-auto text-left border border-red-200">
              {this.state.error.message}
            </div>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 cursor-pointer"
            >
              Reload Store
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('djn_products_v6');
                localStorage.removeItem('djn_products_v7');
                localStorage.removeItem('djn_cart');
                localStorage.removeItem('djn_wishlist');
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              Clear Cache & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);

