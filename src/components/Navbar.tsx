import React, { useState } from 'react';
import { Screen } from '../types';
import { ShoppingBag, Search, Sparkles, X, Compass, Home, BookOpen } from 'lucide-react';

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
      <header className="relative w-full px-3 md:px-8 max-w-7xl mx-auto pt-2.5 md:pt-6 pb-2 transition-all">
        <div className="rounded-xl border border-[#EAE4DC] bg-[#FAF8F5] shadow-sm px-3.5 sm:px-5 md:px-8 py-2.5 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 md:gap-8">
          {/* Top Row on Mobile / Left Zone on Desktop */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Brand Wordmark */}
            <button
              onClick={() => onNavigate('home')}
              className="text-left group flex items-baseline gap-1.5 focus:outline-none cursor-pointer"
            >
              <span className="font-['Playfair_Display'] text-xl sm:text-2xl md:text-2xl tracking-[0.16em] font-medium text-[#1A1615] transition-colors group-hover:text-[#C5A059]">
                SHRI SAVITRI
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[9px] sm:text-[10px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
                Studio
              </span>
            </button>

            {/* Mobile Actions (Search & Cart) */}
            <div className="flex md:hidden items-center gap-1.5">
              <button
                onClick={() => setShowSearch(!showSearch)}
                aria-label="Search Collection"
                className="p-2 text-[#1A1615]/80 hover:text-[#1A1615] hover:bg-[#F5F0EA] rounded-full transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCart}
                aria-label="View Shopping Bag"
                className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#FAF8F5] bg-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] rounded-full transition-all cursor-pointer min-h-[44px]"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="w-4 h-4 rounded-full bg-[#C5A059] text-[#1A1615] text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Responsive: Swipeable on Mobile, Horizontal on Desktop) */}
          <nav className="flex items-center gap-1.5 sm:gap-3 md:gap-8 text-[11px] md:text-xs font-semibold tracking-[0.08em] md:tracking-[0.1em] uppercase overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto">
            <a
              data-path="home"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className={`transition-all whitespace-nowrap shrink-0 px-2.5 py-1.5 md:px-0 md:py-1 rounded-full md:rounded-none border-b-0 md:border-b cursor-pointer flex items-center gap-1 ${
                currentScreen === 'home'
                  ? 'bg-[#1A1615] text-[#FAF8F5] md:bg-transparent md:text-[#1A1615] md:border-[#1A1615]'
                  : 'text-[#1A1615]/70 hover:text-[#1A1615] hover:bg-[#EAE4DC]/50 md:hover:bg-transparent md:border-transparent md:hover:border-[#C5A059]'
              }`}
            >
              <Home className="w-3 h-3 md:hidden text-[#C5A059]" />
              <span>Showcase</span>
            </a>
            <a
              data-path="catalogue"
              href="#catalogue"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('catalogue');
              }}
              className={`transition-all whitespace-nowrap shrink-0 px-2.5 py-1.5 md:px-0 md:py-1 rounded-full md:rounded-none border-b-0 md:border-b cursor-pointer flex items-center gap-1 ${
                currentScreen === 'catalogue'
                  ? 'bg-[#1A1615] text-[#FAF8F5] md:bg-transparent md:text-[#1A1615] md:border-[#1A1615]'
                  : 'text-[#1A1615]/70 hover:text-[#1A1615] hover:bg-[#EAE4DC]/50 md:hover:bg-transparent md:border-transparent md:hover:border-[#C5A059]'
              }`}
            >
              <Compass className="w-3 h-3 md:hidden text-[#C5A059]" />
              <span>Customizer Studio</span>
            </a>
            <a
              data-path="story"
              href="#story"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('brand-story');
              }}
              className={`transition-all whitespace-nowrap shrink-0 px-2.5 py-1.5 md:px-0 md:py-1 rounded-full md:rounded-none border-b-0 md:border-b cursor-pointer flex items-center gap-1 ${
                currentScreen === 'brand-story'
                  ? 'bg-[#1A1615] text-[#FAF8F5] md:bg-transparent md:text-[#1A1615] md:border-[#1A1615]'
                  : 'text-[#1A1615]/70 hover:text-[#1A1615] hover:bg-[#EAE4DC]/50 md:hover:bg-transparent md:border-transparent md:hover:border-[#C5A059]'
              }`}
            >
              <BookOpen className="w-3 h-3 md:hidden text-[#C5A059]" />
              <span>The Atelier</span>
            </a>
          </nav>

          {/* Desktop Actions (Search & Bag) */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
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
              className="relative flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#FAF8F5] bg-[#1A1615] hover:bg-[#C5A059] hover:text-[#1A1615] rounded transition-all cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bag</span>
              <span className="w-4 h-4 rounded-full bg-[#C5A059] text-[#1A1615] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Search Overlay */}
        {showSearch && (
          <div className="mt-2 p-3 bg-[#FAF8F5]/98 backdrop-blur-md border border-[#EAE4DC] rounded-lg shadow-xl flex items-center gap-2.5 z-30 animate-fade-in">
            <Search className="w-4 h-4 text-[#C5A059] shrink-0" />
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
              className="w-full bg-transparent text-xs sm:text-sm text-[#1A1615] placeholder-[#1A1615]/40 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => {
                  onNavigate('catalogue');
                  setShowSearch(false);
                }}
                className="text-xs font-semibold uppercase tracking-wider text-[#C5A059] px-2 py-1 hover:underline cursor-pointer shrink-0"
              >
                Go
              </button>
            )}
            <button
              onClick={() => setShowSearch(false)}
              className="p-1.5 text-[#1A1615]/50 hover:text-[#1A1615] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>
    </>
  );
};
