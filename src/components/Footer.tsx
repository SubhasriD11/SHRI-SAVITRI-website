import React from 'react';
import { Screen } from '../types';

interface FooterProps {
  onNavigate: (screen: Screen) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#1A1615] text-[#FAF8F5] pt-14 pb-12 mt-20 border-t border-[#EAE4DC]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FAF8F5]/10">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <span className="font-['Playfair_Display'] text-2xl tracking-[0.16em] font-medium text-[#FAF8F5] block mb-2">
              SHRI SAVITRI STUDIO
            </span>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-medium block mb-4">
              Indo-Western Couture · Varanasi & Mumbai
            </span>
            <p className="text-xs text-[#FAF8F5]/70 font-light leading-relaxed max-w-sm">
              Re-engineering unstitched five-yard heirlooms into architectural modern silhouettes. 
              Zero safety pins. Two-minute drape guarantee. Fair artisan wages.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold block mb-4">
              Explore Collections
            </span>
            <ul className="space-y-2 text-xs text-[#FAF8F5]/80">
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Pre-Draped Corset Sarees
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Architectural Trench Kurtas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalogue')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  Molten Metallic Organza
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('brand-story')}
                  className="hover:text-[#C5A059] transition-colors"
                >
                  The Drape Manifesto
                </button>
              </li>
            </ul>
          </div>

          {/* Ateliers */}
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold block mb-4">
              Atelier Appointments
            </span>
            <div className="text-xs text-[#FAF8F5]/70 space-y-2">
              <p>
                <strong className="text-[#FAF8F5]">Mumbai Atelier:</strong> 14 B.K. Bomanji Marg, Colaba
              </p>
              <p>
                <strong className="text-[#FAF8F5]">Delhi Flagship:</strong> The Qutub Serai, Mehrauli
              </p>
              <p>
                <strong className="text-[#FAF8F5]">Concierge:</strong> atelier@shrisavitri.com · +91 22 2844 9100
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF8F5]/50 gap-4">
          <p>© {new Date().getFullYear()} SHRI SAVITRI Studio Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Handwoven in Varanasi</span>
            <span>·</span>
            <span>Electroplated 24K Zari</span>
            <span>·</span>
            <span>Zero Synthetic Microplastics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
