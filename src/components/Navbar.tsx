import React, { useState } from 'react';
import { Screen } from '../types';
import { ShoppingBag, Search, Sparkles, X } from 'lucide-react';

interface NavbarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenCart,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header className="relative w-full px-3 md:px-8 max-w-7xl mx-auto pt-3 md:pt-6 pb-2 transition-all">
        <div className="flex items-center justify-between gap-4 md:gap-8 px-5 md:px-8 py-3.5 md:py-4 rounded-xl border border-[#EAE4DC] bg-[#FAF8F5] shadow-sm">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-left group flex items-baseline gap-2 focus:outline-none cursor-pointer"
            >
              <span className="font-['Playfair_Display'] text-xl md:text-2xl tracking-[0.16em] font-medium text-[#1A1615] transition-colors group-hover:text-[#C5A059]">
                SHRI SAVITRI
              </span>
              <span className="hidden sm:inline font-['Plus_Jakarta_Sans'] text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
                Studio
              </span>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="flex items-center gap-4 md:gap-8 text-xs font-semibold tracking-[0.1em] uppercase">
            <a
              data-path="home"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b cursor-pointer ${
                currentScreen === 'home'
                  ? 'border-[#1A1615] text-[#1A1615]'
                  : 'border-transparent text-[#1A1615]/70 hover:text-[#1A1615] hover:border-[#C5A059]'
              }`}
            >
              Showcase
            </a>
            <a
              data-path="catalogue"
              href="#catalogue"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('catalogue');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b cursor-pointer ${
                currentScreen === 'catalogue'
                  ? 'border-[#1A1615] text-[#1A1615]'
                  : 'border-transparent text-[#1A1615]/70 hover:text-[#1A1615] hover:border-[#C5A059]'
              }`}
            >
              Customizer Studio
            </a>
            <a
              data-path="story"
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('brand-story');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b cursor-pointer ${
                currentScreen === 'brand-story'
                  ? 'border-[#1A1615] text-[#1A1615]'
                  : 'border-transparent text-[#1A1615]/70 hover:text-[#1A1615] hover:border-[#C5A059]'
              }`}
            >
              The Atelier
            </a>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <button
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Search Collection"
              className="p-2 text-[#1A1615]/80 hover:text-[#1A1615] hover:bg-[#F5F0EA] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 md:w-4.5 md:h-4.5" />
            </button>

            <button
              onClick={onOpenCart}
              aria-label="View Shopping Bag"
              className="relative flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs font-semibold tracking-wider uppercase text-[#FAF8F5] bg-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] rounded transition-all cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bag</span>
              <span className="w-4 h-4 rounded-full bg-[#C5A059] text-[#1A1615] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Search Overlay */}
        {showSearch && (
          <div className="mt-2 p-3 bg-[#FAF8F5]/98 backdrop-blur-md border border-[#EAE4DC] rounded-lg shadow-xl flex items-center gap-3">
            <Search className="w-4 h-4 text-[#C5A059]" />
            <input
              type="text"
              placeholder="Search Corset Sarees, Zari Kurtas, Organza Drapes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onNavigate('catalogue');
                  setShowSearch(false);
                }
              }}
              className="w-full bg-transparent text-sm text-[#1A1615] placeholder-[#1A1615]/40 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => {
                  onNavigate('catalogue');
                  setShowSearch(false);
                }}
                className="text-xs font-semibold uppercase tracking-wider text-[#C5A059] px-2 py-1 hover:underline cursor-pointer"
              >
                Go
              </button>
            )}
            <button
              onClick={() => setShowSearch(false)}
              className="p-1 text-[#1A1615]/50 hover:text-[#1A1615] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>
    </>
  );
};
